import { useThunkDispatch } from '@hooks/useThunkDispatch';
import { addCouponAsync, removeCouponAsync } from '@store/app/thunks';
import { useSelector } from 'react-redux';
import { selectCart, selectError } from '@store/app/selectors';
import styles from '@pages/page.module.css';

const AddCoupon = () => {
  const thunkDispatch = useThunkDispatch();

  const cart = useSelector(selectCart);
  const error = useSelector(selectError);

  const handleAddCoupon = async () => {
    await thunkDispatch(addCouponAsync());
  };

  const handleRemoveCoupon = async (id: string) => {
    await thunkDispatch(removeCouponAsync(id));
  };

  return (
    <div className={styles.couponContainer}>
      <button onClick={handleAddCoupon} className={styles.card}>
        Add Coupon
      </button>
      <p className={styles.errorMsg}>{error}</p>

      <div>
        <h3>Coupons: </h3>
        {cart.coupons?.length ? (
          cart.coupons?.map((coupon) => (
            <div key={coupon.id} className={styles.couponListItem}>
              <p>
                {coupon.name} - ${coupon.discount} -
              </p>
              <button
                type='button'
                onClick={() => handleRemoveCoupon(coupon.id)}
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p>No coupons</p>
        )}
      </div>
    </div>
  );
};

export default AddCoupon;
