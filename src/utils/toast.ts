import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();
interface Props {
  status: 'default' | 'success' | 'error';
  text: string;
  duration: number;
}

export const toast = ({ status = 'default', text, duration }: Props) => {
  toastEventManager.emit('addtoast', { status, text, duration });
};
