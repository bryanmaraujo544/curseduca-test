import { serverApi } from './serverApi';

interface UpdateProps {
  postId: number;
  content: string;
}
class PostsService {
  async getAll() {
    const { data } = await serverApi.get('/posts');
    return data;
  }

  async update({ postId, content }: UpdateProps) {
    const { data } = await serverApi.put(`/posts/${postId}`, { content });
    return data;
  }

  async delete(id: number) {
    const { data } = await serverApi.delete(`/posts/${id}`);
    return data;
  }
}

export default new PostsService();
