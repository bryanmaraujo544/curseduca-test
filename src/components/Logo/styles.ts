import styled from 'styled-components';

export const Container = styled.div<{ isBlack?: boolean }>`
  position: relative;
  width: calc(25.2rem * 0.7);
  height: calc(4.8rem * 0.7);
  max-width: 25.2rem;
  max-height: 4.8rem;

  img {
    filter: ${({ isBlack }) => (isBlack ? 'contrast(0) brightness(0)' : '')};
  }
`;
