import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import Image from 'next/image';
import { TbLogout } from 'react-icons/tb';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from 'hooks/useTheme';
import { Container, User, Actions } from './styles';

export const Header = () => {
  const { user } = useUser();
  const { colorMode, toggleTheme } = useTheme();
  const { handleLogout } = useUser();

  console.log({ user });

  return (
    <Container>
      <User>
        <div className="profile-img">
          <Image
            src={
              user.profileImg ||
              'https://i.pinimg.com/564x/4e/78/17/4e7817fe4a91ed1f5c9629a51c451229.jpg'
            }
            layout="fill"
            alt="profile-img1"
            objectFit="cover"
          />
        </div>
        <p>{user.name}</p>
      </User>
      <Actions>
        <Button variant="ghost" className="logout-btn" onClick={handleLogout}>
          <TbLogout className="icon" />
          Logout
        </Button>
        <button type="button" className="theme-btn" onClick={toggleTheme}>
          <FaMoon
            className="theme-icon"
            style={{ opacity: colorMode === 'dark' ? 1 : 0 }}
          />

          <FaSun
            className="theme-icon"
            style={{ opacity: colorMode === 'light' ? 1 : 0 }}
          />
        </button>
      </Actions>
    </Container>
  );
};
