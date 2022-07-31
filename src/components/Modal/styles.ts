import styled from 'styled-components';

interface Props {
  isOpen: boolean;
}

export const Overlay = styled.div<Props>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
  z-index: 9999;
  padding: 1.6rem;
  overflow: hidden;
  backdrop-filter: blur(3px);
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-width: 30rem;
  width: 100%;
  max-width: 40rem;
  padding: 2.4rem;
  border-radius: 1.2rem;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - 16px);
  overflow: hidden;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};

    h3 {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.gray[600]};
    }

    .icon {
      font-size: 3rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }

  .body {
    width: 100%;
    margin-top: 1.2rem;
  }
`;
