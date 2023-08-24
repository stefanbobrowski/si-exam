import { useEffect, useState } from 'react';
import {
  addProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
} from '@store/app/thunks';
import Image from 'next/image';
import Link from 'next/link';
import { store } from '@store/store';
import { StoreState } from '@store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { selectIsCartLoading } from '@store/app/selectors';
import MyHead from '@components/head';
import CartIcon from '@components/cartIcon';
import './globals.css';
import styles from '@pages/page.module.css';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

const App = ({ Component }: { Component: React.ComponentType }) => {
  // QUESTION: What does the `as` keyword do here? Why are we using it?
  // Type assertion, we are telling typescript that we know that the dispatch method is a thunk dispatch

  // QUESTION: why do we have to access the store directly here instead of using hooks?
  // Hooks are not available outside of a functional component
  const thunkDispatch = store.dispatch as ThunkDispatch<
    StoreState,
    any,
    Action<any>
  >;

  const [cartIsLoading, setCartIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const cartLoading = selectIsCartLoading(state);
      setCartIsLoading(cartLoading);
    });

    // QUESTION: when will this method returned by the effect be called?
    // When the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddProduct = async () => {
    await thunkDispatch(addProductAsync());
    await thunkDispatch(recalculateShippingAsync());
    thunkDispatch(recalculateTaxesAsync());
  };

  return (
    <Provider store={store}>
      <MyHead />
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/_app.tsx</code>
          </p>
          <div>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              Sharper Image Code Exam
            </a>
          </div>
        </div>

        <Link
          href='/'
          className={styles.center}
          target='_self'
          rel='noopener noreferrer'
        >
          <Image
            className={styles.logo}
            src='/logo.svg'
            alt='Sharper Image Logo'
            width={360}
            height={74}
            priority
          />
        </Link>
        {cartIsLoading && (
          <div className={styles.loader}>
            <Image
              src='/Spinner-1s-200px.svg'
              alt='loading'
              width={50}
              height={50}
            />
          </div>
        )}

        <div className={inter.className}>
          <div className={styles.mainContent}>
            <header>
              <CartIcon />
            </header>
            <Component />
          </div>
        </div>
      </main>
    </Provider>
  );
};

export default App;
