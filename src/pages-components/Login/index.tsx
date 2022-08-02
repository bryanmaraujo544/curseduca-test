import { useState, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import { HiMail, HiKey } from 'react-icons/hi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { Logo } from 'components/Logo';
import { useRouter } from 'next/router';
import { serverApi } from 'services/serverApi';
import { toast } from 'utils/toast';
import { Button } from 'components/Button';
import { useUser } from 'hooks/useUser';
import {
  Container,
  Content,
  Form,
  InputContainer,
  MainContainer,
} from './styles';

export const Login = () => {
  const [inputActive, setInputActive] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogging, setIsLogging] = useState(false);

  const { setUser } = useUser();
  const router = useRouter();
  const isFormValid = email && password;

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        if (isFormValid) {
          setIsLogging(true);

          const {
            data: { token },
          } = await serverApi.post('/auth/login', { email, password });

          toast({
            status: 'success',
            text: 'Você está conectado!',
            duration: 2000,
          });
          nookies.set(null, 'token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days,
          });

          const userToken = jwt.decode(token) as { id: string };

          const { data } = await serverApi.get(`/users/${userToken?.id}`);
          setUser(data.user);
          router.push('/');
        }
      } catch {
        setIsLogging(false);
        toast({
          status: 'error',
          text: 'Algo ocorreu errado. Verifique as informações',
          duration: 5000,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email, password, isFormValid]
  );

  const handleChangeEmail = useCallback((e: any) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Container>
      <Image src="/images/brushs.png" layout="fill" object-fit="cover" alt="" />
      <MainContainer>
        <Content>
          <header>
            <Logo />
          </header>
          <Form onSubmit={handleLogin}>
            <h2>Conecte-se</h2>
            <span className="sub-title">
              Entre agora na rede social Curseduca
            </span>

            <div className="inputs-group">
              <InputContainer isFocus={inputActive === 'email'}>
                <div>
                  <div className="icon">
                    <HiMail />
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    onFocus={() => setInputActive('email')}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
              </InputContainer>
              <InputContainer isFocus={inputActive === 'password'}>
                <div>
                  <div className="icon">
                    <HiKey />
                  </div>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Senha"
                    onFocus={() => setInputActive('password')}
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className="visibility-control"
                  >
                    <span>
                      {isPasswordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </button>
                </div>
              </InputContainer>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              isLoading={isLogging}
              className="login-btn"
            >
              Entrar na minha conta
            </Button>

            <span className="has-account">
              Não tem uma conta? <Link href="/register">Registre-se agora</Link>
            </span>
          </Form>
        </Content>
      </MainContainer>
    </Container>
  );
};
