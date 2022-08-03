import {
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
  FormEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
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
import CommentsService from 'services/CommentsService';
import LikesService from 'services/LikesService';
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
  const [isLiking, setIsLiking] = useState(false);

  const [isCommenting, setIsCommenting] = useState(false);

  const { user } = useUser();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { setAllPosts } = useContext(PostsContext);

  const isLiked = post.likes.some((like) => like.authorId === user.id);

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

  const handleLikePost = useCallback(async () => {
    try {
      setIsLiking(true);

      const { like } = await LikesService.create({ postId: post.id });

      setAllPosts((prev) =>
        prev.map((postToUpdate) => {
          if (postToUpdate.id === post.id) {
            return {
              ...postToUpdate,
              likes: [...postToUpdate.likes, like],
            };
          }
          return postToUpdate;
        })
      );

      setIsLiking(false);

      // Save in back-end
    } catch {
      setIsLiking(false);
    }
  }, [post, user]);

  const handleUnlikePost = useCallback(async () => {
    try {
      setIsLiking(true);

      await LikesService.delete({ postId: post.id });

      setAllPosts((prev) =>
        prev.map((postToUpdate) => {
          if (postToUpdate.id === post.id) {
            const newLikes = postToUpdate.likes.filter(
              (like) => like.authorId !== user.id
            );
            return {
              ...postToUpdate,
              likes: newLikes,
            };
          }
          return postToUpdate;
        })
      );

      setIsLiking(false);
      // Save in back-end
    } catch {
      setIsLiking(false);
    }
  }, [post, user]);

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

  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      setAllPosts((prev) =>
        prev.map((postToUpdate) => {
          if (postToUpdate.id === post.id) {
            const filteredComments = postToUpdate.comments.filter(
              (comment) => comment.id !== commentId
            );

            return { ...postToUpdate, comments: filteredComments };
          }
          return postToUpdate;
        })
      );
      toast({
        status: 'success',
        duration: 2000,
        text: 'Comentário deletado.',
      });
      await CommentsService.delete(commentId);
    } catch {
      toast({
        status: 'error',
        duration: 2000,
        text: 'Erro ao delete comentário.',
      });
    }
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
        <Button
          type="button"
          className="like-btn"
          onClick={() => (isLiked ? handleUnlikePost() : handleLikePost())}
          variant="ghost"
          disabled={isLiking}
        >
          <AiOutlineHeart
            style={{ opacity: !isLiked ? '1' : '0' }}
            className="icon"
          />
          <AiFillHeart
            style={{ opacity: isLiked ? '1' : '0' }}
            className="icon liked"
          />
        </Button>
        <span>{post.likes.length} likes</span>
        <button type="button" onClick={() => commentInputRef?.current?.focus()}>
          <TbMessageCircle2 className="icon" />
        </button>
      </PostActions>

      <hr />

      <UserActions as="form" onSubmit={handleCommentOnPost}>
        <ProfileImgBox>
          <Image
            src={
              post?.author?.profileImg ||
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
            <Comment key={`comment-${comment.id}`}>
              <ProfileImgBox>
                <Image
                  src={
                    comment.author.profileImg ||
                    'https://i.pinimg.com/564x/4e/78/17/4e7817fe4a91ed1f5c9629a51c451229.jpg'
                  }
                  layout="fill"
                  objectFit="cover"
                  alt={`${comment.author.name}-img`}
                />
              </ProfileImgBox>

              <div className="info-container">
                <span>{comment.author.name}</span>
                <p>{comment.content}</p>
              </div>
              {user.id === comment.author.id && (
                <Button
                  variant="ghost"
                  className="delete-btn"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <BsTrash />
                </Button>
              )}
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
