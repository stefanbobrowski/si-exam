import { Cart } from '@models/cart';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreState } from '@store';
import { selectCart, selectSubtotal } from './selectors';

export const loadCartAsync = createAsyncThunk('cart/loadCart', async () => {
  const loadCart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : ({} as Cart);
  return loadCart as Cart;
});

export const setCartAsync = createAsyncThunk(
  'cart/setCartAsync',
  async (newCart: Cart) => {
    return newCart;
  }
);

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const newCart = await fetch('/api/addProduct', {
      method: 'POST',
      body: JSON.stringify(oldCart),
    }).then((resp) => resp.json());

    return newCart as Cart;
  }
);

export const removeProductAsync = createAsyncThunk(
  'cart/removeProductAsync',
  async (id: string, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);
    const params = { cart: oldCart, removalId: id };

    const newCart = await fetch('/api/removeProduct', {
      method: 'POST',
      body: JSON.stringify(params),
    }).then((resp) => resp.json());

    return newCart as Cart;
  }
);

export const addCouponAsync = createAsyncThunk(
  'cart/addCouponAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    if (!oldCart.products?.length) {
      throw new Error('Please purchase a product first.');
    }

    if (oldCart?.coupons && oldCart?.coupons.length >= 2) {
      throw new Error('You can only apply two coupons max.');
    }

    const newCart = await fetch('/api/addCoupon', {
      method: 'POST',
      body: JSON.stringify(oldCart),
    }).then((resp) => resp.json());

    const curSubTotal = selectSubtotal(state);
    const newTotalCoupons =
      newCart.coupons?.reduce(
        (subTotal: string, c: any) => subTotal + c.discount,
        0
      ) ?? 0;

    if (newTotalCoupons > curSubTotal / 2) {
      throw new Error(`Coupon could not be applied. Exceeds 50% of subtotal.`);
    } else {
      const shippingAdjustedCart = await calculateShipping(newCart);
      const taxAdjustedCart = await calculateTaxes(shippingAdjustedCart);
      return taxAdjustedCart;
    }
  }
);

export const removeCouponAsync = createAsyncThunk(
  'cart/removeCouponAsync',
  async (id: string, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);

    const params = { cart: oldCart, removalId: id };

    const newCart = await fetch('/api/removeCoupon', {
      method: 'POST',
      body: JSON.stringify(params),
    }).then((resp) => resp.json());

    const shippingAdjustedCart = await calculateShipping(newCart);
    const taxAdjustedCart = await calculateTaxes(shippingAdjustedCart);
    return taxAdjustedCart as Cart;
  }
);

const calculateShipping = async (cart: Cart) => {
  const newCart = await fetch('/api/recalculateShipping', {
    method: 'POST',
    body: JSON.stringify(cart),
  }).then((resp) => resp.json());
  return newCart;
};

export const recalculateShippingAsync = createAsyncThunk(
  'cart/recalculateShippingAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);
    const newCart = await calculateShipping(oldCart);
    return newCart as Cart;
  }
);

const calculateTaxes = async (cart: Cart) => {
  const newCart = await fetch('/api/recalculateTaxes', {
    method: 'POST',
    body: JSON.stringify(cart),
  }).then((resp) => resp.json());
  return newCart;
};

export const recalculateTaxesAsync = createAsyncThunk(
  'cart/recalculateTaxesAsync',
  async (_, { getState }) => {
    const state = getState() as StoreState;
    const oldCart = selectCart(state);
    const newCart = await calculateTaxes(oldCart);
    return newCart as Cart;
  }
);
