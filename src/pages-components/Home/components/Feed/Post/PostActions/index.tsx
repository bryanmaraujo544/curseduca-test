import { useState, useCallback, useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import LikesService from 'services/LikesService';

import { Button } from 'components/Button';
import { PostsContext } from 'pages-components/Home';
import { useUser } from 'hooks/useUser';
import { Container } from './styles';
import { PostProps } from '..';

export const PostActions = ({
  post,
  commentInputRef,
}: {
  post: PostProps;
  commentInputRef: any;
}) => {
  const [isLiking, setIsLiking] = useState(false);

  const { setAllPosts } = useContext(PostsContext);
  const { user } = useUser();

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

  const isLiked = post.likes.some((like) => like.authorId === user.id);

  return (
    <Container>
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
    </Container>
  );
};
