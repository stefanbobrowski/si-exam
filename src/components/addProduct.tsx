import { useThunkDispatch } from '@hooks/useThunkDispatch';
import {
  addProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
} from '@store/app/thunks';
import Link from 'next/link';
import styles from '@pages/page.module.css';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });

const AddProduct = () => {
  const thunkDispatch = useThunkDispatch();

  const handleAddProduct = async () => {
    await thunkDispatch(addProductAsync());
    await thunkDispatch(recalculateShippingAsync());
    thunkDispatch(recalculateTaxesAsync());
  };

  return (
    <Link href='' className={styles.card} onClick={handleAddProduct}>
      <h2 className={inter.className}>
        Add product <span>+</span>
      </h2>
      <span className={inter.className}>Add product to cart</span>
    </Link>
  );
};

export default AddProduct;
