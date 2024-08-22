import { FormEvent, JSX, useEffect, useRef } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import PageTitle from '../../components/page-title/page-title';
import RandomCityLink from '../../components/random-city-link/random-city-link';
import { loginAction } from '../../store/async-thunk/auth/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-zA-Z])/;

const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email);
const isValidPassword = (password: string): boolean => PASSWORD_PATTERN.test(password);

function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  function clearFormFields() {
    if (loginRef.current) {
      loginRef.current.value = '';
    }
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      const isLoginValid = isValidEmail(email);
      const isPasswordValid = isValidPassword(password);

      if (isLoginValid && isPasswordValid) {
        dispatch(loginAction({ login: email, password }))
          .unwrap()
          .then(() => {
            clearFormFields();
          })
          .catch(() => {
            toast.error('Ошибка сервера, попробуйте позже', { position: 'top-center' });
          });
      } else {
        if (!isLoginValid) {
          toast.error('Неверный формат email', { position: 'top-center' });
        }
        if (!isPasswordValid) {
          toast.error('Пароль должен содержать как минимум одну цифру и одну латинскую букву и не должен содержать спецсимволы', { position: 'top-center' });
        }
      }
    }
  }

  useEffect(() => () => clearFormFields(), []);

  return (
    <div className="page page--gray page--login" data-testid="login-page">
      <PageTitle title="6 cities: authorization" />
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login" data-testid="login-section">
            <h1 className="login__title" data-testid="login-title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleFormSubmit} noValidate>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="input-email">E-mail</label>
                <input
                  id="input-email"
                  ref={loginRef}
                  className="login__input form__input"
                  type="text"
                  name="email"
                  placeholder="Email"
                  data-testid="email-input"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="input-password">Password</label>
                <input
                  id="input-password"
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password-input"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" data-testid="submit-button">Sign in</button>
            </form>
          </section>
          <RandomCityLink />
        </div>
      </main>
    </div>
  );
}

export default Login;
