import type { GetServerSideProps, NextPage } from 'next';
import { Home as HomeComponent } from 'pages-components/Home';
import { serverApi } from 'services/serverApi';
import nookies from 'nookies';

const Home: NextPage = () => <HomeComponent />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);

  try {
    await serverApi.post(
      '/auth',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    serverApi.defaults.headers.Authorization = `Bearer ${token}`;

    return {
      props: {
        user: null,
      },
    };
  } catch (err: any) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default Home;

