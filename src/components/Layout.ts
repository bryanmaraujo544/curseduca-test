import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 0 3.2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  @media (max-width: 468px) {
    padding: 0 1.6rem;
  }
`;
