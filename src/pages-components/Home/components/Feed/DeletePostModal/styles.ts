import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1.6rem;

  button {
    flex: 1;
    border: 0;
    height: 4.2rem;
    border-radius: 1.2rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }

    &:first-child {
      background: ${({ theme }) => theme.colors.gray[200]};
      color: ${({ theme }) => theme.colors.gray[800]};
    }

    &:last-child {
      background: ${({ theme }) => theme.colors.red.main};
      color: ${({ theme }) => theme.colors.red.bg};
    }
  }
`;
