import { JSX } from 'react';
import styles from './not-found.module.css';
import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { resetErrorMessage } from '../../store/slices/offer/offer.ts';
import PageTitle from '../../components/page-title/page-title.tsx';

function NotFound (): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <PageTitle title='6 cities: not-found' />
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Oops! Page not found</p>
        <p className={styles.description}>
          Возможно, страница, которую вы ищете, была удалена, ее имя было изменено или она временно недоступна.
        </p>
        <Link to="/" className={styles.homeLink} onClick={() => dispatch(resetErrorMessage())}>Go to Homepage</Link>
      </div>
    </div>
  );
}

export default NotFound;
