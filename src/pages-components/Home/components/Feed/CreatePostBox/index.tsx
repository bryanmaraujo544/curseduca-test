import { useState } from 'react';
import Image from 'next/image';
import { BsImage } from 'react-icons/bs';
import { ProfileImgBox } from 'components/ProfileImgBox';
import { Button } from 'components/Button';
import { Container, MainContainer } from './styles';

export const CreatePostBox = () => {
  const [content, setContent] = useState('');

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
      <MainContainer>
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
          <Button type="submit" className="create-post-btn">
            Enviar
          </Button>
        </div>
      </MainContainer>
    </Container>
  );
};
