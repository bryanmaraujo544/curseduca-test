import { CreatePostBox } from './CreatePostBox';
import { Post } from './Post';
import { Container, Posts } from './styles';

const MOCK_POSTS = [
  {
    id: 323,
    author: {
      id: 21,
      name: 'Junio Sousa',
      profileImg: 'https://avatars.githubusercontent.com/u/62571814?v=4',
    },
    content:
      'In some cases you may see a third-party client name, which indicates the Tweet came from a non-Twitter application.',
    imageUrl: 'https://avatars.githubusercontent.com/u/62571814?v=4',
    createdAt: 'há 2 horas',
  },
  {
    id: 3323,
    author: {
      id: 21,
      name: 'Junio Sousa',
      profileImg: 'https://avatars.githubusercontent.com/u/62571814?v=4',
    },
    content:
      'In some cases you may see a third-party client name, which indicates the Tweet came from a non-Twitter application.',
    imageUrl: '',
    createdAt: 'há 1 hora',
  },
];

export const Feed = () => {
  console.log('feed');

  return (
    <Container>
      <CreatePostBox />
      <Posts>
        {MOCK_POSTS.map((post) => (
          <Post postInfos={post} key={post.id} />
        ))}
      </Posts>
    </Container>
  );
};
