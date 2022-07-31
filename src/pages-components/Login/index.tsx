import { useState, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { isEmailValid } from 'utils/isValidEmail';
import { isPasswordValid } from 'utils/isPasswordValid';
import { useErrors } from 'hooks/useErrors';
import { HiMail, HiKey } from 'react-icons/hi';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { Logo } from 'components/Logo';
import { useRouter } from 'next/router';
import { Container, Content, Form, InputContainer, Button } from './styles';

export const Login = () => {
  const [inputActive, setInputActive] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const isFormValid = email && password;

  const handleCreateAccout = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      try {
        if (isFormValid) {
          // TODO: make the api call to login in account
          router.push('/');
          console.log({
            email,
            password,
          });
        }
      } catch {}
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
      <header>
        <Logo />
      </header>
      <Content>
        <Form onSubmit={handleCreateAccout}>
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

          <Button type="submit" disabled={!isFormValid}>
            Entrar na minha conta
          </Button>

          <span className="has-account">
            Não tem uma conta? <Link href="/register">Registre-se agora</Link>
          </span>
        </Form>
      </Content>
    </Container>
  );
};
