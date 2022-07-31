import { Feed } from './components/Feed';
import { Header } from './components/Header';
import { Profile } from './components/Profile';
import { Container } from './styles';

export const Home = () => {
  console.log('Home');

  return (
    <Container>
      <Header />
      <div className="main-container">
        <Profile />
        <Feed />
      </div>
    </Container>
  );
};
