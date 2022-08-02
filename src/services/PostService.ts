import { serverApi } from './serverApi';

class PostsService {
  async getAll() {
    const { data } = await serverApi('/posts');
    return data;
  }
}

export default new PostsService();
