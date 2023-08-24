'use client';
import { useEffect } from 'react';
import {
  selectCart,
  selectShippingPrice,
  selectSubtotal,
  selectTaxes,
  selectTotal,
  selectTotalCouponsAmount,
} from '@store/app/selectors';
import { useThunkDispatch } from '@hooks/useThunkDispatch';
import { useSelector } from 'react-redux';
import { store } from '@store/store';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '@store';
import { Action } from 'redux';
import AddProduct from '@components/addProduct';
import AddCoupon from '@components/addCoupon';
import styles from '@pages/page.module.css';
import {
  loadCartAsync,
  removeProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
} from '@store/app/thunks';

const Cart = () => {
  const thunkDispatch = useThunkDispatch();
  // const thunkDispatch = store.dispatch as ThunkDispatch<
  //   StoreState,
  //   any,
  //   Action<any>
  // >;

  const cart = useSelector(selectCart);
  const subtotal = useSelector(selectSubtotal);
  const shippingPrice = useSelector(selectShippingPrice);
  const taxes = useSelector(selectTaxes);
  const total = useSelector(selectTotal);
  const couponsAmount = useSelector(selectTotalCouponsAmount);

  const handleRemoveProduct = async (id: string) => {
    const res = await thunkDispatch(removeProductAsync(id)).unwrap();
    handleCalculateShipping();
    return res;
  };

  const handleCalculateShipping = async () => {
    const res = await thunkDispatch(recalculateShippingAsync()).unwrap();
    thunkDispatch(recalculateTaxesAsync()).unwrap();
    return res;
  };

  useEffect(() => {
    thunkDispatch(loadCartAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.cartPage}>
      <h2>Cart</h2>
      <AddProduct />
      <div className={styles.twoCol}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.products?.length ? (
              (cart.products ?? []).map((p) => {
                return (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => handleRemoveProduct(p.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3}>No products in cart.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <div className={styles.cartRundown}>
            <p>
              <b>Sub-total:</b> ${subtotal.toFixed(2)}
            </p>
            <p>
              <b>Coupons:</b>{' '}
              <span style={{ color: 'green' }}>
                ${couponsAmount.toFixed(2)}
              </span>
            </p>
            <p>
              <b>Shipping:</b> ${shippingPrice.toFixed(2)}
            </p>
            <p>
              <b>Taxes:</b> ${taxes.toFixed(2)}
            </p>
            <p>
              <b>Total:</b> <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <AddCoupon />
        </div>
      </div>
    </div>
  );
};

export default Cart;
