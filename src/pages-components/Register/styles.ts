/* eslint-disable no-nested-ternary */
import { Layout } from 'components/Layout';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.yellow.dark};

  header {
    padding: 2.4rem 0;
  }
`;

export const MainContainer = styled(Layout)`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.section`
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 6.4rem;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .img-container {
    width: 100%;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 768px) {
      display: none;
    }

    img {
      width: 40rem !important;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin-bottom: 2.4rem;

  .submit-btn {
    height: 5.6rem;
    margin-top: 1.6rem;
  }

  h2 {
    font-size: 3.2rem;
  }

  .sub-title {
    display: block;
  }

  span {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .inputs-group {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: 1.6rem;

    .password-tip {
      margin-top: -0.8rem;
      font-size: 1.4rem;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray[100]};

    input {
      height: 1.6rem;
      width: 1.6rem;
    }
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
