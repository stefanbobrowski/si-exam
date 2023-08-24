import { useSelector } from 'react-redux';
import { selectCart } from '@store/app/selectors';
import Link from 'next/link';
import styles from '@pages/page.module.css';

const CartIcon = () => {
  const cart = useSelector(selectCart);
  const cartCount = cart.products?.length;

  return (
    <Link
      href='/cart'
      target='_self'
      rel='noopener noreferrer'
      className={styles.cartIcon}
    >
      <span>🛒&nbsp;</span>
      <span> {cartCount}</span>
    </Link>
  );
};

export default CartIcon;
