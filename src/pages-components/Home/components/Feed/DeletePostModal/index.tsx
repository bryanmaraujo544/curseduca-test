import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'components/Modal';
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
  console.log('delete modal');

  function handleCloseModal() {
    setIsDeletePostModalOpen(false);
  }

  function handleDeletePost() {
    try {
      // Delete post on back-end
      console.log({ postIdToDelete });
      handleCloseModal();
    } catch {}
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
        <button type="button" onClick={handleDeletePost}>
          Deletar
        </button>
      </Container>
    </Modal>
  );
};
