import { useState } from 'react';
import { CreatePostBox } from './CreatePostBox';
import { DeletePostModal } from './DeletePostModal';
import { Post, PostProps } from './Post';
import { Container, Posts } from './styles';

export const Feed = ({ posts }: { posts: PostProps[] }) => {
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(-1);

  return (
    <>
      <Container>
        <CreatePostBox />
        <Posts>
          {posts.map((post) => (
            <Post
              postInfos={post}
              key={post.id}
              setIsDeletePostModalOpen={setIsDeletePostModalOpen}
              setPostIdToDelete={setPostIdToDelete}
            />
          ))}
        </Posts>
      </Container>
      <DeletePostModal
        isDeletePostModalOpen={isDeletePostModalOpen}
        setIsDeletePostModalOpen={setIsDeletePostModalOpen}
        postIdToDelete={postIdToDelete}
      />
    </>
  );
};
