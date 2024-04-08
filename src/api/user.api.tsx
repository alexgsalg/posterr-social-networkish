import api from './axios';
import { User } from '../models/user.model';

class UserService {
  constructor() {}

  public updateUser = async (user: User) => {
    try {
      const response = await api.put(`/user/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
}

export default new UserService();
