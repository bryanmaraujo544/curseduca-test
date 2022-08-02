import { Dispatch, SetStateAction, useState, useContext } from 'react';
import { Modal } from 'components/Modal';
import PostService from 'services/PostService';
import { toast } from 'utils/toast';
import { Button } from 'components/Button';
import { PostsContext } from 'pages-components/Home';
import { Container } from './styles';

interface Props {
  isDeletePostModalOpen: boolean;
  setIsDeletePostModalOpen: Dispatch<SetStateAction<boolean>>;
  postIdToDelete: number;
}

export const DeletePostModal = ({
  isDeletePostModalOpen,
  setIsDeletePostModalOpen,
  postIdToDelete,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { setAllPosts } = useContext(PostsContext);

  function handleCloseModal() {
    setIsDeletePostModalOpen(false);
    setIsDeleting(false);
  }

  async function handleDeletePost() {
    try {
      setIsDeleting(true);

      setAllPosts((prev) => prev.filter((post) => post.id !== postIdToDelete));

      await PostService.delete(postIdToDelete);
      toast({ status: 'success', duration: 2000, text: 'Post deletado!' });
      handleCloseModal();
    } catch {
      setIsDeleting(false);
      toast({ status: 'success', duration: 2000, text: 'Post deletado!' });
    }
  }

  return (
    <Modal
      isModalOpen={isDeletePostModalOpen}
      handleCloseModal={handleCloseModal}
      title="Deletar Post"
    >
      <Container>
        <button type="button" onClick={handleCloseModal}>
          Cancelar
        </button>
        <Button
          type="button"
          onClick={handleDeletePost}
          isLoading={isDeleting}
          disabled={isDeleting}
          className="delete-btn"
        >
          Deletar
        </Button>
      </Container>
    </Modal>
  );
};
