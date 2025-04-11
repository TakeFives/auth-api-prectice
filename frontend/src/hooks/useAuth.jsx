import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user } = useContext(AuthContext);
  console.log('useAuth:', user);
  return user;
};

export default useAuth;