import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, Helvetica, sans-Serif;
    line-height: 1.2;
    color: ${({ theme }) => theme.colorMain};
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 24px 0;
  }
`;
