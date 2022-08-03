import { FormEvent, useContext, useState } from 'react';
import Image from 'next/image';
import { ProfileImgBox } from 'components/ProfileImgBox';
import { Button } from 'components/Button';
import { toast } from 'utils/toast';
import { serverApi } from 'services/serverApi';
import { PostsContext } from 'pages-components/Home';
import { useUser } from 'hooks/useUser';
import { Container, MainContainer } from './styles';

export const CreatePostBox = () => {
  const [content, setContent] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const { setAllPosts } = useContext(PostsContext);
  const { user } = useUser();

  async function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    try {
      if (!content) {
        toast({ status: 'error', duration: 1000, text: 'Digite algo.' });
        return;
      }

      if (isCreating) {
        return;
      }

      setIsCreating(true);

      const { data } = await serverApi.post('/posts', { content });

      setAllPosts((prev) => [data.post, ...prev]);

      setContent('');
      // PUT NEW POST IN POSTS STATE
      setIsCreating(false);
      toast({ status: 'success', duration: 3000, text: 'Post criado' });
    } catch {
      setIsCreating(false);
      toast({
        status: 'error',
        duration: 3000,
        text: 'Algo deu errado. Tente novamente',
      });
    }
  }

  return (
    <Container>
      <ProfileImgBox>
        <Image
          layout="fill"
          objectFit="cover"
          src={
            user.profileImg ||
            'https://i.pinimg.com/564x/4e/78/17/4e7817fe4a91ed1f5c9629a51c451229.jpg'
          }
          alt="Profile Image"
        />
      </ProfileImgBox>
      <MainContainer onSubmit={handleCreatePost}>
        <textarea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="bottom-actions">
          <Button
            type="submit"
            className="create-post-btn"
            isLoading={isCreating}
            disabled={isCreating}
          >
            Enviar
          </Button>
        </div>
      </MainContainer>
    </Container>
  );
};
