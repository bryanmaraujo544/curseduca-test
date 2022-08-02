import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useMemo,
} from 'react';

interface ToasterCtxProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  position: string;
  setPosition: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

export const ToasterContext = createContext({} as ToasterCtxProps);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');

  const toastValues = useMemo(
    () => ({ content, setContent, position, setPosition, status, setStatus }),
    [content, setContent, position, setPosition, status, setStatus]
  );

  return (
    <ToasterContext.Provider value={toastValues}>
      {children}
    </ToasterContext.Provider>
  );
};
