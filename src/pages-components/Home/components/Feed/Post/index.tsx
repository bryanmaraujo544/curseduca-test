import {
  useEffect,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { IoOptions } from 'react-icons/io5';

import { ProfileImgBox } from 'components/ProfileImgBox';
import { useUser } from 'hooks/useUser';
import PostService from 'services/PostService';
import { PostsContext } from 'pages-components/Home';
import { toast } from 'utils/toast';
import { Button } from 'components/Button';
import {
  Container,
  PostHeader,
  PostContent,
  PostActions,
  UserActions,
  Comments,
  Comment,
  PostMenuContainer,
} from './styles';

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
      }[]
    | [];
  comments:
    | {
        id: number;
        author: Author;
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
  const [isLiked, setIsLiked] = useState(false);
  const [seeAllComments, setSeeAllComments] = useState(false);

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  const [isToEditPostContent, setIsToEditPostContent] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUser();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { setAllPosts } = useContext(PostsContext);

  useEffect(() => {
    if (post.likes.some(({ authorId }) => authorId === 1)) {
      setIsLiked(true);
    }
  }, [post]);

  const handleCommentOnPost = useCallback(() => {
    try {
      console.log(commentContent);
      setCommentContent('');
    } catch {}
  }, [commentContent]);

  const handleLikePost = useCallback(() => {
    try {
      setIsLiked(true);
      // Save in back-end
    } catch {}
  }, []);

  const handleUnlikePost = useCallback(() => {
    try {
      setIsLiked(false);
      // Save in back-end
    } catch {}
  }, []);

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
  }, [newPostContent, user]);

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeletePostModalOpen(true);
    setPostIdToDelete(post.id);
  }, [post]);

  const isMyPost = user?.id === post?.author?.id;

  return (
    <Container>
      <PostHeader>
        <ProfileImgBox>
          <Image
            src={
              post?.author?.profileImg ||
              'https://avatars.githubusercontent.com/u/62571814?v=4'
            }
            layout="fill"
            objectFit="cover"
            alt={`${post?.author?.name}-profile-image`}
          />
        </ProfileImgBox>

        <div className="infos-container">
          <p>{post.author.name}</p>
          <span>{post.createdAt}</span>
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
              <button type="button" onClick={handleBeginPostUpdate}>
                <BsPencil className="icon" />
                Editar
              </button>
              <button type="button" onClick={handleOpenDeleteModal}>
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

      <PostActions>
        <button
          type="button"
          className="like-btn"
          onClick={() => (isLiked ? handleUnlikePost() : handleLikePost())}
        >
          <AiOutlineHeart
            style={{ opacity: !isLiked ? '1' : '0' }}
            className="icon"
          />
          <AiFillHeart
            style={{ opacity: isLiked ? '1' : '0' }}
            className="icon liked"
          />
        </button>

        <button type="button" onClick={() => commentInputRef?.current?.focus()}>
          <TbMessageCircle2 className="icon" />
        </button>
      </PostActions>

      <hr />

      <UserActions>
        <ProfileImgBox>
          <Image
            src={
              post?.author?.profileImg ||
              'https://avatars.githubusercontent.com/u/62571814?v=4'
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
          <button type="button" onClick={handleCommentOnPost}>
            <AiOutlineSend />
          </button>
        )}
      </UserActions>

      <Comments>
        {post.comments
          .slice(0, seeAllComments ? post.comments.length : 2)
          .map((comment) => (
            <Comment key={`comment-${comment.id}`}>
              <ProfileImgBox>
                <Image
                  src={comment.author.profileImg}
                  layout="fill"
                  objectFit="cover"
                  alt={`${comment.author.name}-img`}
                />
              </ProfileImgBox>

              <div className="info-container">
                <span>{comment.author.name}</span>
                <p>{comment.content}</p>
              </div>
            </Comment>
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
