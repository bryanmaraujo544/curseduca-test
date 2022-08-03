import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  gap: 1.2rem;

  button {
    position: relative;
    background: none;
    border: 0;
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      position: absolute;
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.gray[700]};

      &.liked {
        color: ${({ theme }) => theme.colors.red.main};
      }
    }
  }

  .like-btn {
    padding: 0 !important;
  }

  span {
    margin-right: 0.4rem;
  }
`;
