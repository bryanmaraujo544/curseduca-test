/* eslint-disable dot-notation */
import type { GetServerSideProps } from 'next';
import { Home as HomeComponent } from 'pages-components/Home';
import { serverApi } from 'services/serverApi';
import nookies from 'nookies';
import PostService from 'services/PostService';
import { PostProps } from 'pages-components/Home/components/Feed/Post';

const Home = ({ posts }: { posts: PostProps[] }) => (
  <HomeComponent posts={posts} />
);

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

    serverApi.defaults.headers['Authorization'] = `Bearer ${token}`;

    const posts = await PostService.getAll();

    return {
      props: {
        posts,
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

