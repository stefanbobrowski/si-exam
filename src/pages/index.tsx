'use client';
import { useEffect } from 'react';
import AddProduct from '@components/addProduct';
import styles from '@pages/page.module.css';
import Link from 'next/link';
import { useThunkDispatch } from '@hooks/useThunkDispatch';
import { loadCartAsync } from '@store/app/thunks';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const thunkDispatch = useThunkDispatch();

  useEffect(() => {
    thunkDispatch(loadCartAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.homePage}>
      <h2>Home Page</h2>
      <p>Welcome to Sharper Image</p>

      <AddProduct />

      <Link
        href='/cart'
        className={styles.card}
        target='_self'
        rel='noopener noreferrer'
      >
        <h2>
          View cart <span>-&gt;</span>
        </h2>
        <span className={inter.className}>
          See the items that have been added to your cart.
        </span>
      </Link>
    </div>
  );
};

export default Home;
