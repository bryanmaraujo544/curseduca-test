import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { serverApi } from 'services/serverApi';
import jwt from 'jsonwebtoken';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

interface User {
  id: number;
  name: string;
  profileImg: string;
}

interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  handleLogout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as User);
  const cookies = parseCookies();

  const userToken = jwt.decode(cookies.token) as { id: string };
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await serverApi.get(`/users/${userToken?.id}`);
      setUser(data.user);
    })();
  }, []);

  const handleLogout = useCallback(() => {
    setUser({} as User);
    destroyCookie(null, 'token');
    router.push('/login');
  }, []);

  const contextValues = useMemo(
    () => ({ user, setUser, handleLogout }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
