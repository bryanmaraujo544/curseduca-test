import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { Container } from './styles';

interface Props {
  id: number;
  text: string;
  status?: 'default' | 'success' | 'error';
  onRemoveMessage: (id: number) => void;
  duration?: number;
}

export const ToastMessage = ({
  id,
  text,
  status = 'default',
  onRemoveMessage,
  duration,
}: Props) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      onRemoveMessage(id);
    }, duration || 5000);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [id, duration, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      type={status}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {status === 'success' && (
        <Image
          src="/icons/check-circle.svg"
          height={22}
          width={22}
          alt="close-icon"
        />
      )}
      {status === 'error' && (
        <Image
          src="/icons/x-circle.svg"
          height={22}
          width={22}
          alt="close-icon"
        />
      )}

      <strong>{text}</strong>
    </Container>
  );
};
