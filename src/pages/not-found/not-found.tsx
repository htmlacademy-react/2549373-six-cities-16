import { JSX } from 'react';
import styles from './not-found.module.css';
import {Link} from 'react-router-dom';

function NotFound (): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Oops! Page not found</p>
        <p className={styles.description}>
          Возможно, страница, которую вы ищете, была удалена, ее имя было изменено или она временно недоступна.
        </p>
        <Link to="/" className={styles.homeLink}>Go to Homepage</Link>
      </div>
    </div>
  );
}

export default NotFound;
