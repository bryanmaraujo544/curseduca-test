import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

interface ToastMessageProps {
  id: number;
  status: 'default' | 'success' | 'error';
  text: string;
  duration?: number;
}

export const ToastContainer = () => {
  const [messages, setMessages] = useState([] as ToastMessageProps[]);

  useEffect(() => {
    function handleAddToast({
      status,
      text,
      duration,
    }: Omit<ToastMessageProps, 'id'>) {
      setMessages((prev) => [
        ...prev,
        { id: Math.random(), status, text, duration },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  return (
    <Container>
      <AnimatePresence>
        {messages.map(({ id, text, status, duration }) => (
          <ToastMessage
            key={id}
            id={id}
            text={text}
            duration={duration}
            status={status}
            onRemoveMessage={handleRemoveMessage}
          />
        ))}
      </AnimatePresence>
    </Container>
  );
};
