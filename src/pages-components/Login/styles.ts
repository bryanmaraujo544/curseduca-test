/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { Layout } from 'components/Layout';

export const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.yellow.dark};
  display: flex;
  align-items: center;
`;

export const MainContainer = styled(Layout)`
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  header {
    display: flex;
    justify-content: center;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 550px;
  background-color: #ffffff10;
  padding: 4.8rem 5.6rem 6.4rem;
  border-radius: 2rem;
  margin-bottom: 2.4rem;
  height: 100%;

  @media (max-width: 468px) {
    padding: 3.2rem 2.4rem 2.4rem;
  }

  h2 {
    font-size: 3.2rem;
    text-align: center;
  }

  .sub-title {
    display: block;
    text-align: center;
  }

  span {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .inputs-group {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 1.6rem;
  }

  .has-account {
    text-align: center;

    a {
      color: ${({ theme }) => theme.colors.yellow.main};
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const InputContainer = styled.div<{
  isFocus?: boolean;
  hasError?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div {
    width: 100%;
    display: flex;

    background: transparent;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[500]};
    height: 4.8rem;
    overflow: hidden;
    outline: ${({ isFocus, hasError, theme }) =>
      isFocus
        ? `1px solid ${theme.colors.yellow.main}`
        : hasError
        ? `1px solid ${theme.colors.red.main}`
        : '0'};

    input {
      flex: 1;
      background: none;
      border: 0;
      outline: none;
      color: ${({ theme }) => theme.colors.gray[300]};
    }

    .icon {
      width: 4.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
    }

    .visibility-control {
      background: none;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1.6rem;
      font-size: 1.4rem;

      span {
        color: ${({ theme }) => theme.colors.gray[300]};
        font-size: 1.8rem;
        display: flex;
      }
    }
  }

  .error-msg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.red.main};
    margin-top: 0.4rem;
  }
`;

export const Button = styled.button`
  border: 0;
  margin-top: 1.6rem;
  height: 5.6rem;
  background: ${({ theme }) => theme.colors.yellow.main};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 1.2rem;
  font-weight: 600;
  transition: filter 0.2s;

  &:not(:disabled)&:hover {
    filter: brightness(0.8);
  }
`;
