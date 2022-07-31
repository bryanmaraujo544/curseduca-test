import styled from 'styled-components';

export const ProfileImgBox = styled.div`
  position: relative;
  width: 4.8rem;
  height: 4.8rem;
  overflow: hidden;
  border-radius: 1.2rem;
  border: 2px solid ${({ theme }) => theme.colors.gray[400]};
`;
