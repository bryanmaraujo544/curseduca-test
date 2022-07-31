import { Button } from 'components/Button';
import styled from 'styled-components';

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 1.6rem;
  display: flex;
  gap: 1.6rem;
  padding: 1.6rem;
`;

export const LeftContainer = styled.div`
  .profile-img {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 1.2rem;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const MainContainer = styled.div`
  flex: 1;

  textarea {
    text-align: left;
    vertical-align: center;
    resize: vertical;
    width: 100%;
    border: 0;
    background: ${({ theme }) => theme.colors.gray[100]};
    height: 4.8rem;
    min-height: 4.8rem;
    max-height: 9.6rem;
    padding: 1.2rem 1.6rem;
    border-radius: 1.2rem;
    color: ${({ theme }) => theme.colors.gray[600]};

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.gray[400]};
    }
  }

  .bottom-actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.8rem;

    .action-box {
      border: 0;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      font-weight: 500;
      background: ${({ theme }) => theme.colors.gray[100]};
      padding: 0.8rem 1.2rem;
      border-radius: 1.2rem;
      font-size: 1.6rem;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => theme.colors.gray[300]};
      }
    }
  }
`;

export const CreatePostBtn = styled(Button)`
  height: 3.6rem;
  padding: 0 2.4rem;
`;
