import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
  isLoading?: boolean;
  children: any;
  variant?: 'primary' | 'ghost';
}

export const Button = ({
  onClick,
  isLoading,
  children,
  variant = 'primary',
  ...rest
}: Props) => (
  <Container {...rest} onClick={onClick} variant={variant}>
    {isLoading ? <div className="loader" /> : children}
  </Container>
);
