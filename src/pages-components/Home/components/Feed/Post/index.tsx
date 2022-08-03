import {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
  FormEvent,
  useEffect,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { AiOutlineSend } from 'react-icons/ai';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { IoOptions } from 'react-icons/io5';

import { ProfileImgBox } from 'components/ProfileImgBox';
import { useUser } from 'hooks/useUser';
import PostService from 'services/PostService';
import { PostsContext } from 'pages-components/Home';
import { toast } from 'utils/toast';
import { Button } from 'components/Button';
import CommentsService from 'services/CommentsService';
import {
  Container,
  PostHeader,
  PostContent,
  UserActions,
  Comments,
  PostMenuContainer,
} from './styles';
import { PostActions } from './PostActions';
import { Comment } from './Comment';

interface Author {
  id: number;
  name: string;
  profileImg: string;
}

export interface PostProps {
  id: number;
  content: string;
  imageUrl: string;
  createdAt: string;
  author: Author;
  likes:
    | {
        id: number;
        authorId: number;
        postId: number;
      }[]
    | [];
  comments:
    | {
        id: number;
        author: Author;
        postId: number;
        authorId: number;
        content: string;
      }[]
    | [];
}
export interface Props {
  postInfos: PostProps;
  setIsDeletePostModalOpen: Dispatch<SetStateAction<boolean>>;
  setPostIdToDelete: Dispatch<SetStateAction<number>>;
}

export const Post = ({
  postInfos: post,
  setIsDeletePostModalOpen,
  setPostIdToDelete,
}: Props) => {
  const [commentContent, setCommentContent] = useState('');
  const [seeAllComments, setSeeAllComments] = useState(false);

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  const [isToEditPostContent, setIsToEditPostContent] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [isCommenting, setIsCommenting] = useState(false);

  const { user } = useUser();
  const { setAllPosts } = useContext(PostsContext);

  const commentInputRef = useRef<HTMLInputElement>(null);
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isToEditPostContent) {
      editTextAreaRef?.current?.focus();
    }
  }, [isToEditPostContent]);

  const handleCommentOnPost = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        if (isCommenting) {
          return;
        }

        if (!commentContent) {
          toast({
            status: 'default',
            duration: 2000,
            text: 'Digite algo',
          });
          return;
        }

        setIsCommenting(true);

        const data = await CommentsService.create({
          postId: post.id,
          content: commentContent,
        });

        setAllPosts((prev) =>
          prev.map((postToUpdate) => {
            if (postToUpdate.id === post.id) {
              return {
                ...postToUpdate,
                comments: [data.comment, ...postToUpdate.comments],
              };
            }
            return postToUpdate;
          })
        );

        toast({ status: 'success', duration: 2000, text: 'Comentário feito!' });

        setCommentContent('');
        setIsCommenting(false);
      } catch {
        setIsCommenting(false);
        toast({
          status: 'error',
          duration: 2000,
          text: 'Algo deu errado. Tente novamente',
        });
      }
    },
    [commentContent, post]
  );

  const handleBeginPostUpdate = useCallback(() => {
    setIsToEditPostContent(true);
    setIsPostMenuOpen(false);
    setNewPostContent(post.content);
  }, []);

  const handleEditPost = useCallback(async () => {
    try {
      setIsEditing(true);

      const data = await PostService.update({
        postId: post.id,
        content: newPostContent,
      });

      setAllPosts((prev) =>
        prev.map((postToUpdate) => {
          if (postToUpdate.id === post.id) {
            return data.post;
          }
          return postToUpdate;
        })
      );

      toast({ status: 'success', duration: 2000, text: 'Post atualizado.' });

      setIsToEditPostContent(false);
      setIsEditing(false);
      setNewPostContent('');
    } catch {
      setIsEditing(false);
      toast({
        status: 'error',
        duration: 4000,
        text: 'Algo deu errado. Tente novamente',
      });
    }
  }, [newPostContent, user, post]);

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeletePostModalOpen(true);
    setPostIdToDelete(post.id);
  }, []);

  const isMyPost = user?.id === post?.author?.id;

  const createdAtFormatted = DateTime.fromISO(post.createdAt, {
    zone: 'pt-BR',
    setZone: true,
  })
    .setLocale('pt-BR')
    .toLocaleString(DateTime.DATETIME_MED);

  return (
    <Container>
      <PostHeader>
        <ProfileImgBox>
          <Image
            src={
              post?.author?.profileImg ||
              'https://i.pinimg.com/564x/4e/78/17/4e7817fe4a91ed1f5c9629a51c451229.jpg'
            }
            layout="fill"
            objectFit="cover"
            alt={`${post?.author?.name}-profile-image`}
          />
        </ProfileImgBox>

        <div className="infos-container">
          <p>{post.author.name}</p>
          <span>{createdAtFormatted}</span>
        </div>

        {isMyPost && (
          <PostMenuContainer>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setIsPostMenuOpen((prev) => !prev)}
            >
              <IoOptions />
            </button>
            <motion.div
              className="options-container"
              style={{
                y: isPostMenuOpen ? 'calc(100% + .8rem)' : 'calc(100% - .8rem)',
                display: isPostMenuOpen ? 'flex' : 'none',
              }}
            >
              <button
                type="button"
                onClick={handleBeginPostUpdate}
                tabIndex={-1}
              >
                <BsPencil className="icon" />
                Editar
              </button>
              <button
                type="button"
                onClick={handleOpenDeleteModal}
                tabIndex={-1}
              >
                <BsTrash className="icon" />
                Deletar
              </button>
            </motion.div>
          </PostMenuContainer>
        )}
      </PostHeader>

      <PostContent isToEdit={isToEditPostContent}>
        {isToEditPostContent ? (
          <>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              ref={editTextAreaRef}
              onBlur={() => setIsToEditPostContent(false)}
            />
            <Button
              type="button"
              className="submit-edit-btn"
              isLoading={isEditing}
              disabled={isEditing}
              onClick={() => handleEditPost()}
            >
              Confirmar
            </Button>
          </>
        ) : (
          <p className="content-text">{post.content}</p>
        )}
        {post.imageUrl && (
          <div className="content-img">
            <Image
              src={post.imageUrl}
              layout="fill"
              alt="Post image"
              objectFit="cover"
            />
          </div>
        )}
      </PostContent>

      <PostActions post={post} commentInputRef={commentInputRef} />

      <hr />

      <UserActions as="form" onSubmit={handleCommentOnPost}>
        <ProfileImgBox>
          <Image
            src={
              user.profileImg ||
              'https://i.pinimg.com/564x/4e/78/17/4e7817fe4a91ed1f5c9629a51c451229.jpg'
            }
            layout="fill"
            objectFit="cover"
            alt="your-profile-image"
          />
        </ProfileImgBox>

        <input
          type="text"
          placeholder="Deixe seu comentário..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          ref={commentInputRef}
        />

        {commentContent && (
          <Button
            type="submit"
            isLoading={isCommenting}
            disabled={isCommenting}
            className="comment-btn"
          >
            <AiOutlineSend />
          </Button>
        )}
      </UserActions>

      <Comments>
        {post.comments
          .slice(0, seeAllComments ? post.comments.length : 2)
          .map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              comment={comment}
              postId={post.id}
            />
          ))}

        {post.comments.length > 2 && (
          <button
            type="button"
            className="see-more-btn"
            onClick={() => setSeeAllComments((prev) => !prev)}
          >
            {seeAllComments ? 'Ver menos comentários' : 'Ver todos comentários'}
          </button>
        )}
      </Comments>
    </Container>
  );
};
