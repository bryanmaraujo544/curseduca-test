import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1.6rem;

  .info-container {
    flex: 1;

    span {
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray[900]};
    }

    p {
      color: ${({ theme }) => theme.colors.gray[800]};
      word-break: break-word;
    }
  }

  .delete-btn {
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.red.main};
      filter: brightness(1);
    }
  }
`;
