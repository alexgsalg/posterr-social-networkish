import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import api from '../api/axios';
import { User } from '../models/user.model';

export const useFetchUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<AxiosError | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await api.get<User[]>('/user');
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, error, loading };
};
