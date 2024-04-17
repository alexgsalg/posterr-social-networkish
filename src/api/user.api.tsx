import api from './axios';
import { User } from '../models/user.model';

class UserService {
  constructor() {}

  getUsers = async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/user/');
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  // change to local storage only
  updateUser = async (user: User): Promise<User> => {
    try {
      const response = await api.put<User>(`/user/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
}

export default new UserService();
