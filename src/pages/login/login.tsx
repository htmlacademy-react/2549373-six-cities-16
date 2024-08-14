import { FormEvent, JSX, useEffect, useRef } from 'react';
import Header from '../../components/header/header.tsx';
import { loginAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import PageTitle from '../../components/page-title/page-title.tsx';
import RandomCityLink from '../../components/random-city-link/random-city-link.tsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /(?=.*\d)(?=.*[a-zA-Z])/;

const isValidEmail = (email: string): boolean => emailPattern.test(email);
const isValidPassword = (password: string): boolean => passwordPattern.test(password);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
            toast.error('Ошибка сервера, попробуйте позже',{ position: 'top-center' });
          });
      } else {
        if (!isLoginValid) {
          toast.error('Неверный формат email',{ position: 'top-center' });
        }
        if (!isPasswordValid) {
          toast.error('Пароль должен содержать как минимум одну цифру и одну латинскую букву и не должен содержать спецсимволы',{ position: 'top-center' });
        }
      }
    }
  }


  useEffect(() => () => clearFormFields(), []);
  return (
    <div className="page page--gray page--login">
      <PageTitle title="6 cities: authorization"/>
      <Header/>
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
          <RandomCityLink />
        </div>
      </main>
    </div>
  );
}

export default Login;
