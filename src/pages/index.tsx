import Cookies from 'js-cookie';
import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import { api } from '../lib/axios';
import iconsCheckImg from './../assets/icon-check.svg';
import usersAvatarExampleImg from './../assets/users-avatar-example.png';
import { withAuth } from './../auth/withAuth';
interface HomeProps {
  poolsCount: number;
  guessesCount: number;
  userCount: number;
}
export default function Home({
  poolsCount,
  guessesCount,
  userCount,
}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  const createPool = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const token = Cookies.get('get');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.post('/pools', {
        title: poolTitle,
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code);
      alert(
        'Bolão foi criado com sucesso, o código foi copiado para área de transferência!',
      );
      setPoolTitle('');
    } catch (err) {
      alert('Falha ao criar bolão');
    }
  };
  return (
    <div className="max-w-[1124px] mx-auto h-screen grid p-8 grid-flow-row lg:grid-flow-col gap-28 items-center">
      <Head>
        <title>Tela Inicial</title>
      </Head>
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span>
            pessoas já estão usando
          </strong>
        </div>
        <form
          onSubmit={createPool}
          className="mt-10 flex gap-2 flex-col lg:flex-row"
        >
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100 outline-none focus:border-yellow-500"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar o seu bolão, você receberá um código único que poderá usar
          para convidar outas pessoas
        </p>
        <div className="mt-10 p-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconsCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolsCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={iconsCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma previa da aplicação móvel"
        quality={100}
        className="lg:flex hidden m-auto h-full justify-center center items-center object-contain"
      />
    </div>
  );
}

export const getServerSideProps = withAuth(async () => {
  const [poolsCountResponse, guessesCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ]);
  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
});
