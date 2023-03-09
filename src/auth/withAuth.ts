import jwtDecode from 'jwt-decode';
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from 'next';

export const withAuth = (func: GetServerSideProps) => {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
      const token = ctx.req.cookies?.token;
      if (!token) {
        return {
          redirect: {
            destination: '/SingIn',
            permanent: false,
          },
        };
      }
      const payload = jwtDecode<{ exp?: number }>(token);
      if (!payload.exp) {
        return {
          redirect: {
            destination: '/SingIn',
            permanent: false,
          },
        };
      }
      const now = Date.now();
      if (now < payload.exp) {
        return {
          redirect: {
            destination: '/SingIn',
            permanent: false,
          },
        };
      }
      return func(ctx);
    } catch (error) {
      return {
        redirect: {
          destination: '/SingIn',
          permanent: false,
        },
      };
    }
  };
  return getServerSideProps;
};
