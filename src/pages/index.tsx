import { GetServerSideProps } from 'next';
import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import iconsCheckImg from './../assets/icon-check.svg';
import usersAvatarExampleImg from './../assets/users-avatar-example.png';
interface HomeProps {
  count: number;
}
export default function Home({ count }: HomeProps) {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1>
          Crie seu próprio bolão da copa e compartilhe entre
          amigos!
        </h1>
      </main>

      <div>
        <Image src={usersAvatarExampleImg} alt="" />
        <strong>
          <span>+12.592 </span> pessoas já estão usando
        </strong>
      </div>
      <form>
        <input
          type="text"
          required
          placeholder="Qual nome do seu bolão"
        />
        <button type="submit">Criar meu bolão</button>
      </form>
      <p>
        Após criar o seu bolão, você receberá um código
        único que poderá usar para convidar outas pessoas
      </p>
      <div>
        <div>
          <Image src={iconsCheckImg} alt="" />
          <div>
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div>
          <Image src={iconsCheckImg} alt="" />
          <div>
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
      </div>
      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma previa da aplicação móvel"
        quality={100}
      />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps =
  async () => {
    const response = await fetch(
      'http://localhost:3333/pools/count'
    );
    const data = await response.json();
    return {
      props: {
        count: data.count
      }
    };
  };
