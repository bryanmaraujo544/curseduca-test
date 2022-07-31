import { Layout } from 'components/Layout';
import styled from 'styled-components';

export const Container = styled(Layout)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;
  min-height: 100vh;

  .main-container {
    display: grid;
    grid-template-columns: 25rem 1fr 25rem;
    gap: 2rem;
    flex: 1;
  }
`;
