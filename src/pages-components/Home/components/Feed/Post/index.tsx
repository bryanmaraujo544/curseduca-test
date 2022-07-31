import { ProfileImgBox } from 'components/ProfileImgBox';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import {
  Container,
  PostHeader,
  PostContent,
  PostActions,
  UserActions,
  Comments,
  Comment,
} from './styles';

interface Author {
  id: number;
  name: string;
  profileImg: string;
}
interface PostProps {
  postInfos: {
    id: number;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: Author;
    likes:
      | {
          id: number;
          authorId: number;
        }[]
      | [];
    comments:
      | {
          id: number;
          author: Author;
          content: string;
        }[]
      | [];
  };
}

export const Post = ({ postInfos: post }: PostProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [seeAllComments, setSeeAllComments] = useState(false);

  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post.likes.some(({ authorId }) => authorId === 1)) {
      setIsLiked(true);
    }
  }, [post]);

  function handleCommentOnPost() {
    try {
      console.log(commentContent);
      setCommentContent('');
    } catch {}
  }

  function handleLikePost() {
    try {
      setIsLiked(true);
      // Save in back-end
    } catch {}
  }

  function handleUnlikePost() {
    try {
      setIsLiked(false);
      // Save in back-end
    } catch {}
  }

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
        <button
          type="button"
          className="like-btn"
          onClick={() => (isLiked ? handleUnlikePost() : handleLikePost())}
        >
          <AiOutlineHeart
            style={{ opacity: !isLiked ? '1' : '0' }}
            className="icon"
          />
          <AiFillHeart
            style={{ opacity: isLiked ? '1' : '0' }}
            className="icon liked"
          />
        </button>
        <button type="button" onClick={() => commentInputRef?.current?.focus()}>
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
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          ref={commentInputRef}
        />
        {commentContent && (
          <button type="button" onClick={handleCommentOnPost}>
            <AiOutlineSend />
          </button>
        )}
      </UserActions>
      <Comments>
        {post.comments
          .slice(0, seeAllComments ? post.comments.length : 2)
          .map((comment) => (
            <Comment key={`comment-${comment.id}`}>
              <ProfileImgBox>
                <Image
                  src={comment.author.profileImg}
                  layout="fill"
                  objectFit="cover"
                  alt={`${comment.author.name}-img`}
                />
              </ProfileImgBox>
              <div className="info-container">
                <span>{comment.author.name}</span>
                <p>{comment.content}</p>
              </div>
            </Comment>
          ))}
        {post.comments.length > 2 && (
          <button
            type="button"
            className="see-more-btn"
            onClick={() => setSeeAllComments((prev) => !prev)}
          >
            {seeAllComments ? 'Ver menos comentários' : 'Ver todos comentários'}
          </button>
        )}
      </Comments>
    </Container>
  );
};
