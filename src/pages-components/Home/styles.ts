import { Layout } from 'components/Layout';
import styled from 'styled-components';

export const Container = styled(Layout)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray[100]};
  flex: 1;
  height: 100vh;

  .main-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    gap: 2rem;
    flex: 1;
  }
`;
