import { useSelector } from 'react-redux';
import { selectUsers } from '../store/user/user.slice';
import { User } from '../models/user.model';

export const useFindUser = (
  id: string | null | undefined,
): User | undefined => {
  const allUsers = useSelector(selectUsers);

  if (!id) return undefined;
  const user = allUsers.find((user) => user.id === id) || undefined;

  return user;
};
