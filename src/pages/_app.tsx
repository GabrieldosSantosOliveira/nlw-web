import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';

import './../styles/globals.css';

export default function App({
  Component,
  pageProps
}: AppProps) {
  return (
    <GoogleOAuthProvider clientId="288331783256-uf91vha3b4rcmq812rd9a7ikpgqsvfvc.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
