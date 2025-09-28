import type { AppProps } from "next/app";
import "../styles/globals.css";

// This is the correct structure for the pages router _app file.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
