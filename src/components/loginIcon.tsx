import { useSelector } from 'react-redux';
import { selectCart } from '@store/app/selectors';
import Link from 'next/link';
import styles from '@pages/page.module.css';

const loginIcon = () => {
  return (
    <Link
      href='/login'
      target='_self'
      rel='noopener noreferrer'
      className={styles.loginIcon}
    >
      <span>Login</span>
    </Link>
  );
};

export default loginIcon;
