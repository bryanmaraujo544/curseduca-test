import { Button } from 'components/Button';
import { ProfileImgBox } from 'components/ProfileImgBox';
import { BsTrash } from 'react-icons/bs';
import Image from 'next/image';
import { useCallback, useContext } from 'react';
import { PostsContext } from 'pages-components/Home';
import { useUser } from 'hooks/useUser';
import { toast } from 'utils/toast';
import CommentsService from 'services/CommentsService';
import { Container } from './styles';

interface Author {
  id: number;
  name: string;
  profileImg: string;
}

interface Props {
  comment: {
    id: number;
    author: Author;
    postId: number;
    authorId: number;
    content: string;
  };
  postId: number;
}

export const Comment = ({ comment, postId }: Props) => {
  const { setAllPosts } = useContext(PostsContext);
  const { user } = useUser();

  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      setAllPosts((prev) =>
        prev.map((postToUpdate) => {
          if (postToUpdate.id === postId) {
            const filteredComments = postToUpdate.comments.filter(
              (commentFilt) => commentFilt.id !== commentId
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

  return (
    <Container>
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
    </Container>
  );
};
