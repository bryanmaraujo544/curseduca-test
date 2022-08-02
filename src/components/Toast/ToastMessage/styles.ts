import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.yellow.main};
    color: ${({ theme }) => theme.colors.yellow.dark};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.green.main};
    color: ${({ theme }) => theme.colors.green.bg};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.red.main};
    color: ${({ theme }) => theme.colors.red.bg};
  `,
};

export const Container = styled.div<{ type: 'default' | 'success' | 'error' }>`
  padding: 1.6rem 3.2rem;
  background: ${({ theme }) => theme.colors.green.main};
  color: #fff;
  border-radius: 0.8rem;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;

  ${({ type }) => containerVariants[type]}

  & + div {
    margin-top: 1.2rem;
  }
`;
