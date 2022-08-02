import styled from 'styled-components';

export const Container = styled.main`
  background: transparent;
  height: auto;
  overflow-y: scroll;
  padding-right: 0.8rem;

  width: 100%;
  max-width: 700px;

  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 99rem;

    &:hover {
      background: ${({ theme }) => theme.colors.gray[400]};
    }
  }
`;

export const Posts = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1.6rem;
`;
