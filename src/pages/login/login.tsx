import { FormEvent, JSX, useRef } from 'react';
import Header from '../../components/header/header.tsx';
import { loginAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import PageTitle from '../../components/page-title/page-title.tsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /(?=.*\d)(?=.*[a-zA-Z])/;

const isValidEmail = (email: string): boolean => emailPattern.test(email);
const isValidPassword = (password: string): boolean => passwordPattern.test(password);

function Login(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loginRef.current && passwordRef.current) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      const isLoginValid = isValidEmail(email);
      const isPasswordValid = isValidPassword(password);

      if (isLoginValid && isPasswordValid) {
        dispatch(loginAction({ login: email, password }));
      } else {
        if (!isLoginValid) {
          toast.error('Неверный формат email');
        }
        if (!isPasswordValid) {
          toast.error('Пароль должен содержать как минимум одну цифру и одну латинскую букву и не должен содержать спецсимволы');
        }
      }
    }
  }

  return (
    <div className="page page--gray page--login">
      <PageTitle title='6 cities: authorization' />
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit} noValidate>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
