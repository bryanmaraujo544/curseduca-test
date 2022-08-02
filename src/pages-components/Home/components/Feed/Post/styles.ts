import { Button } from 'components/Button';
import { ContentBox } from 'components/ContentBox';
import styled from 'styled-components';

export const Container = styled(ContentBox)`
  hr {
    margin: 2rem 0;
    background: ${({ theme }) => theme.colors.gray[300]};
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

export const PostHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  .infos-container {
    p {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray[900]};
    }

    span {
      color: ${({ theme }) => theme.colors.gray[600]};
      font-size: 1.4rem;
    }
  }
`;

export const PostMenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;

  .menu-btn {
    display: flex;
    background: none;
    border: 0;
    font-size: 2rem;
    height: 100%;
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  .options-container {
    position: absolute;
    bottom: 0rem;
    transform: translateY(calc(100% + 0.8rem));
    right: 0;
    background: ${({ theme }) => theme.colors.gray[300]};
    padding: 0.8rem;
    border-radius: 1.2rem;
    z-index: 20;
    width: 15rem;

    display: flex;
    flex-direction: column;

    button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.8rem;
      background: none;
      width: 100%;
      border: 0;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray[800]};
      padding: 0.4rem 0.8rem;
      border-radius: 0.8rem;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => theme.colors.gray[400]};
      }

      &:focus {
        background: ${({ theme }) => theme.colors.gray[400]};
      }
    }
  }
`;

export const PostContent = styled.div<{ isToEdit: boolean }>`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ isToEdit }) => (isToEdit ? 'flex-end' : 'flex-start')};

  .submit-edit-btn {
    font-size: 1.4rem;
    height: 3.6rem;
    margin-top: 0.8rem;
    width: 12.5rem;
  }

  textarea {
    width: 100%;
    background: ${({ theme }) => theme.colors.gray[100]};
    padding: 0.8rem;
    resize: vertical;
    height: 6.4rem;
    min-height: 5.6rem;
    max-height: 9.6rem;
    color: ${({ theme }) => theme.colors.gray[700]};
    border-radius: 1.2rem;
  }

  .content-img {
    position: relative;
    width: 100%;
    height: 25rem;
    border-radius: 1.6rem;
    overflow: hidden;
    margin-top: 1.6rem;
  }
`;

export const PostActions = styled.div`
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
`;

export const UserActions = styled.footer`
  display: flex;
  gap: 1.6rem;

  input {
    background: ${({ theme }) => theme.colors.gray[100]};
    border: 0;
    height: 4.8rem;
    border-radius: 1.2rem;
    padding: 0 1.6rem;
    color: ${({ theme }) => theme.colors.gray[800]};
    flex: 1;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.gray[400]};
    }
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-left: 1.6rem;
  margin-top: 2.4rem;

  .see-more-btn {
    border: 0;
    background: ${({ theme }) => theme.colors.gray[300]};
    color: ${({ theme }) => theme.colors.gray[800]};
    height: 3.6rem;
    border-radius: 1.2rem;
    font-weight: 500;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const Comment = styled.div`
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
