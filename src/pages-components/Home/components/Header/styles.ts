import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 1.2rem;
  margin: 1.6rem 0;
  display: flex;
  padding: 1.6rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.1rem 0.3rem #00000010;

  .logout-btn {
    color: ${({ theme }) => theme.colors.gray[700]};
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.gray[500]};
    }
    .icon {
      font-size: 2rem;
    }
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .profile-img {
    position: relative;
    width: 3.6rem;
    height: 3.6rem;
    overflow: hidden;
    border-radius: 0.8rem;
    border: 2px solid ${({ theme }) => theme.colors.yellow.main};
  }

  p {
    font-weight: 700;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;

  .theme-btn {
    background: none;
    border: 0;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.4rem;
    height: 2.4rem;

    .theme-icon {
      position: absolute;
      font-size: 2rem;
    }
  }
`;
