import Image from 'next/image';
import { Container } from './styles';

interface Props {
  isBlack?: boolean;
}

export const Logo = ({ isBlack }: Props) => (
  <Container isBlack={isBlack}>
    <Image
      layout="fill"
      src="/images/logo-curseduca.png"
      alt="curseduca"
      objectFit="contain"
    />
  </Container>
);
