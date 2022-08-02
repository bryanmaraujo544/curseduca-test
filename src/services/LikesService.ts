import { serverApi } from './serverApi';

interface Create {
  postId: number;
}

class LikesService {
  async create({ postId }: Create) {
    const { data } = await serverApi.post('/likes', { postId });
    return data;
  }

  async delete({ postId }: Create) {
    const { data } = await serverApi.delete(`/likes/${postId}`);
    return data;
  }
}

export default new LikesService();
