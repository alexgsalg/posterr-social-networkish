import api from './axios';
import { Post } from '../models/post.model';

class PostService {
  constructor() {}

  public addPost = async (post: Post) => {
    try {
      const response = await api.post(`/post`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  public updatePost = async (post: Post) => {
    try {
      const response = await api.put(`/post/${post.id}`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
}

export default new PostService();
