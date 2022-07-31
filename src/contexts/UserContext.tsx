import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface User {
  id: number;
  name: string;
  profileImg: string;
}

interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    setUser({
      id: 1,
      name: 'Bryan Martins',
      profileImg: 'https://github.com/bryanmaraujo544.png',
    });
  }, []);

  const contextValues = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
