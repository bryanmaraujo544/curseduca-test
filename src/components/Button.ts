import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  padding: 0.4rem 1.2rem;
  background: ${({ theme }) => theme.colors.yellow.main};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 1.2rem;
  font-weight: 600;
  transition: filter 0.2s;

  &:not(:disabled)&:hover {
    filter: brightness(0.8);
  }
`;
