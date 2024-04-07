import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import api from '../api/axios';
import { Post } from '../models/post.model';

export const useFetchPosts = () => {
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState<AxiosError | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await api.get<Post[]>('/post');
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Axios Error with Message: ' + error.message);
      } else {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return { data, error, loading, fetchPosts };
};
