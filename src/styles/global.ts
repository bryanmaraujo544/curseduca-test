import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;

        @media (max-width: 768px) {
      font-size: 56.25%;
    }

    @media (max-width: 350px) {
      font-size: 50%;
    }
    
    @media (max-width: 280px) {
      font-size: 43.75%;
    }

      @media (max-width: 230px) {
      font-size: 37.5%;
    }
  }

  body {
    font-size: 1.6rem;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    color: ${({ theme }) => theme.colors.gray[900]};
    background-color: ${({ theme }) => theme.colors.gray[100]}
  }

  body, input, textarea, select, button {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    filter: brightness(0.8);
    cursor: not-allowed;
  }
`;

export default GlobalStyle;
