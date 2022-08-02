import { ButtonHTMLAttributes, ReactElement } from 'react';
import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
  isLoading?: boolean;
  children: any;
}

export const Button = ({ onClick, isLoading, children, ...rest }: Props) => {
  console.log('button');

  return (
    <Container {...rest} onClick={onClick}>
      {isLoading ? <div className="loader" /> : children}
    </Container>
  );
};
