import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #0f0f0f; /* Deep dark background */
    color: #ffffff;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    overflow-x: hidden;
  }

  button, input {
    font-family: inherit;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}