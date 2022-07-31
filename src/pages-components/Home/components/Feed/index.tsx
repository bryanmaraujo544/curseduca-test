import { CreatePostBox } from './CreatePostBox';
import { Container } from './styles';

export const Feed = () => {
  console.log('feed');

  return (
    <Container>
      <CreatePostBox />
      <p>Feed</p>
    </Container>
  );
};
