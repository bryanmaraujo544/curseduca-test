import { ProfileImgBox } from 'components/ProfileImgBox';
import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import {
  Container,
  PostHeader,
  PostContent,
  PostActions,
  UserActions,
} from './styles';

interface PostProps {
  postInfos: {
    id: number;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: {
      id: number;
      name: string;
      profileImg: string;
    };
  };
}

export const Post = ({ postInfos: post }: PostProps) => {
  const [comment, setComment] = useState('');

  const isLiked = true;

  return (
    <Container>
      <PostHeader>
        <ProfileImgBox>
          <Image
            src={post.author.profileImg}
            layout="fill"
            objectFit="cover"
            alt={`${post.author.name}-profile-image`}
          />
        </ProfileImgBox>
        <div className="infos-container">
          <p>{post.author.name}</p>
          <span>{post.createdAt}</span>
        </div>
      </PostHeader>
      <PostContent>
        <p className="content-text">{post.content}</p>
        {post.imageUrl && (
          <div className="content-img">
            <Image
              src={post.imageUrl}
              layout="fill"
              alt="Post image"
              objectFit="cover"
            />
          </div>
        )}
      </PostContent>
      <PostActions>
        <button type="button" className="like-btn">
          <AiOutlineHeart
            style={{ opacity: !isLiked ? '1' : '0' }}
            className="icon"
          />
          <AiFillHeart
            style={{ opacity: isLiked ? '1' : '0' }}
            className="icon liked"
          />
        </button>
        <button type="button">
          <TbMessageCircle2 className="icon" />
        </button>
      </PostActions>
      <hr />
      <UserActions>
        <ProfileImgBox>
          <Image
            src={post.author.profileImg}
            layout="fill"
            objectFit="cover"
            alt="your-profile-image"
          />
        </ProfileImgBox>
        <input
          type="text"
          placeholder="Deixe seu comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment && (
          <button type="button">
            <AiOutlineSend />
          </button>
        )}
      </UserActions>
    </Container>
  );
};
