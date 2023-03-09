import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { api } from './../lib/axios';
export default function SingIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async value => {
      try {
        setIsLoading(true);
        const { data } = await api.post('/users', {
          access_token: value.access_token
        });
        Cookies.set('token', data.token, { expires: 7 });
        router.push('/');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  });
  return (
    <div className="flex flex-1 h-screen justify-center items-center">
      <Head>
        <title>Cadastro</title>
      </Head>
      <button
        onClick={() => login()}
        disabled={isLoading}
        className="bg-white flex flex-row gap-4 items-center justify-between px-6 py-4 rounded text-black font-bold text-sm uppercase hover:bg-gray-100"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters
            className="animate-spin"
            size={24}
            color="#4285F4"
          />
        ) : (
          <>
            <FcGoogle size={24} />
            Entrar com o google
            <div />
          </>
        )}
      </button>
    </div>
  );
}
