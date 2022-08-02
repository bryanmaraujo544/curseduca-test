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

  return (
    <Container>
      <User>
        <div className="profile-img">
          <Image
            src={
              user.profileImg ||
              'https://avatars.githubusercontent.com/u/62571814?v=4'
            }
            layout="fill"
            alt="profile-img"
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
