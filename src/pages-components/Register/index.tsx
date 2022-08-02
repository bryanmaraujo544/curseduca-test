/* eslint-disable no-useless-return */
import { useState, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from 'components/Logo';
import { isEmailValid } from 'utils/isValidEmail';
import { isPasswordValid } from 'utils/isPasswordValid';
import { useErrors } from 'hooks/useErrors';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { HiMail, HiUserCircle, HiKey } from 'react-icons/hi';
import { serverApi } from 'services/serverApi';
import { useRouter } from 'next/router';
import { toast } from 'utils/toast';
import { Button } from 'components/Button';
import {
  Container,
  Content,
  Form,
  InputContainer,
  // Button,
  MainContainer,
} from './styles';

export const Register = () => {
  const [inputActive, setInputActive] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const [isRegistering, setIsRegistering] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors();

  const isFormValid =
    name && isEmailValid(email) && isPasswordValid(password) && isTermsAgreed;
  const router = useRouter();

  // useEffect(() => {
  //   const toaster = Toaster;
  //   toaster();
  // }, []);

  const handleCreateAccout = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        if (!isTermsAgreed) {
          toast({
            status: 'error',
            text: 'É necessário concordar com os termos.',
            duration: 3000,
          });
          return;
        }

        if (!name) {
          setError({ field: 'name', message: 'Campo obrigatório' });
        }

        if (!isEmailValid(email)) {
          setError({ field: 'email', message: 'Email inválido' });
        }

        if (!password || !isPasswordValid(password)) {
          setError({ field: 'password', message: 'Senha inválida' });
        }

        if (isFormValid) {
          setIsRegistering(true);

          await serverApi.post('/users', { name, email, password });

          toast({
            status: 'success',
            text: 'Usuário registrado',
            duration: 2000,
          });
          router.push('/');
        }
      } catch {
        setIsRegistering(false);
        toast({
          status: 'error',
          text: 'Algo ocorreu errado. Verifique as informações',
          duration: 5000,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, email, password, isTermsAgreed, isFormValid]
  );

  const handleChangeName = useCallback((e: any) => {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Campo obrigatório' });
    } else {
      removeError({ field: 'name', message: 'Campo obrigatório' });
    }
  }, []);

  const handleChangeEmail = useCallback(
    (e: any) => {
      setEmail(e.target.value);

      if (!isEmailValid(e.target.value)) {
        setError({ field: 'email', message: 'Email inválido' });
      } else {
        removeError({ field: 'email', message: 'Email inválido' });
      }
    },
    [isEmailValid]
  );

  const handleChangePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);

      if (!isPasswordValid(e.target.value)) {
        setError({ field: 'password', message: 'Senha inválida' });
      } else {
        removeError({ field: 'password', message: 'Senha inválida' });
      }
    },
    [isPasswordValid]
  );

  const inputHasError = useCallback(
    (field: string) => errors.some((error) => error.field === field),
    [errors]
  );

  return (
    <Container>
      <Image src="/images/brushs.png" layout="fill" object-fit="cover" alt="" />
      <MainContainer>
        <header>
          <Logo />
        </header>
        <Content>
          <div className="img-container">
            <Image
              src="/images/social.svg"
              height={200}
              width={200}
              objectFit="contain"
              alt=""
            />
          </div>

          <Form onSubmit={handleCreateAccout}>
            <h2>Registre-se</h2>
            <span className="sub-title">
              Cadastre na rede social da Curseduca
            </span>

            <div className="inputs-group">
              <InputContainer
                isFocus={inputActive === 'name'}
                hasError={inputHasError('name')}
              >
                <div>
                  <div className="icon">
                    <HiUserCircle />
                  </div>
                  <input
                    type="text"
                    placeholder="Nome"
                    onFocus={() => setInputActive('name')}
                    value={name}
                    onChange={handleChangeName}
                  />
                </div>
                {inputHasError('name') && (
                  <span className="error-msg">
                    {getErrorMessageByFieldName('name')}
                  </span>
                )}
              </InputContainer>
              <InputContainer
                isFocus={inputActive === 'email'}
                hasError={inputHasError('email')}
              >
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
                {inputHasError('email') && (
                  <span className="error-msg">
                    {getErrorMessageByFieldName('email')}
                  </span>
                )}
              </InputContainer>
              <InputContainer
                isFocus={inputActive === 'password'}
                hasError={inputHasError('password')}
              >
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
                {inputHasError('password') && (
                  <span className="error-msg">
                    {getErrorMessageByFieldName('password')}
                  </span>
                )}
              </InputContainer>
              <span className="password-tip">
                - pelo menos 6 caracteres; letra maiúscula; número
              </span>

              <label htmlFor="terms">
                <input
                  type="checkbox"
                  id="terms"
                  onChange={(e) => setIsTermsAgreed(e.target.checked)}
                />
                Concordo com os Termos e Condições
              </label>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isRegistering}
              className="submit-btn"
              isLoading={isRegistering}
            >
              Criar minha conta
            </Button>

            <span className="has-account">
              Já tem uma conta? <Link href="/login">Entre agora</Link>
            </span>
          </Form>
        </Content>
      </MainContainer>
    </Container>
  );
};
