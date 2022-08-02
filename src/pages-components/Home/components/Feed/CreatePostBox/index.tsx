import { FormEvent, useContext, useState } from 'react';
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { ProfileImgBox } from 'components/ProfileImgBox';
import { Button } from 'components/Button';
import { toast } from 'utils/toast';
import { serverApi } from 'services/serverApi';
import { PostsContext } from 'pages-components/Home';
import { Container, MainContainer } from './styles';

export const CreatePostBox = () => {
  const [content, setContent] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const { setAllPosts } = useContext(PostsContext);

  async function handleCreatePost(e: FormEvent) {
    e.preventDefault();

    try {
      if (!content) {
        toast({ status: 'error', duration: 1000, text: 'Digite algo.' });
        return;
      }

      setIsCreating(true);

      const { data } = await serverApi.post('/posts', { content });

      setAllPosts((prev) => [...prev, data.post]);

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
          src="https://avatars.githubusercontent.com/u/62571814?v=4"
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
          <button type="button" className="action-box">
            <BsImage className="icon" />
            Imagem
          </button>
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
