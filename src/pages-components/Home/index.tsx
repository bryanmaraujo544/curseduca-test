/* eslint-disable no-unreachable */
import { parseCookies } from 'nookies';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { serverApi } from 'services/serverApi';
import { Feed } from './components/Feed';
import { PostProps } from './components/Feed/Post';
import { Header } from './components/Header';
import { Container } from './styles';

interface PostsContextProps {
  allPosts: PostProps[];
  setAllPosts: Dispatch<SetStateAction<PostProps[]>>;
}

export const PostsContext = createContext({} as PostsContextProps);

export const Home = ({ posts }: { posts: PostProps[] }) => {
  const [allPosts, setAllPosts] = useState<PostProps[]>([]);

  const { token } = parseCookies();

  useEffect(() => {
    if (token) {
      serverApi.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  const contextValues = useMemo(() => ({ allPosts, setAllPosts }), [allPosts]);

  return (
    <Container>
      <PostsContext.Provider value={contextValues}>
        <Header />
        <div className="main-container">
          <Feed posts={allPosts} />
        </div>
      </PostsContext.Provider>
    </Container>
  );
};
