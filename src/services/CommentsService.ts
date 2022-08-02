import { serverApi } from './serverApi';

interface Create {
  postId: number;
  content: string;
}
class CommentsService {
  async create({ postId, content }: Create) {
    const { data } = await serverApi.post('/comments', { content, postId });
    return data;
  }

  async delete(commentId: number) {
    const { data } = await serverApi.delete(`/comments/${commentId}`);
    return data;
  }
}

export default new CommentsService();
