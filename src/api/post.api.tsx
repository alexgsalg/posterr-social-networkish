import api from './axios';
import { Post } from '../models/post.model';

class PostService {
  constructor() {}

  getPosts = async (): Promise<Post[]> => {
    try {
      const response = await api.get('/post');
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // change to local storage only
  addPost = async (post: Post) => {
    try {
      const response = await api.post(`/post`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // change to local storage only
  updatePost = async (post: Post) => {
    try {
      const response = await api.put(`/post/${post.id}`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // change to local storage only
  addComment = async (comment: Post) => {
    comment.isComment = true;
    try {
      const response = await api.post(`/post`, comment);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
}

export default new PostService();
