import { Cart } from '@/models/cart';
import { ActionCreatorWithPayload, createSlice } from '@reduxjs/toolkit';
import {
  loadCartAsync,
  addCouponAsync,
  removeCouponAsync,
  addProductAsync,
  removeProductAsync,
  recalculateShippingAsync,
  recalculateTaxesAsync,
  setCartAsync,
} from './thunks';

export interface AppState {
  isCartLoading: boolean;
  cart: Cart;
  error: string;
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isCartLoading: false,
    cart: {} as Cart,
    error: '',
  },
  reducers: {
    setCart: (state, { payload }: { payload: Cart }) => {
      return {
        ...state,
        cart: payload,
      };
    },
  },
  extraReducers: (builder) => {
    [
      loadCartAsync,
      setCartAsync,
      addProductAsync,
      removeProductAsync,
      addCouponAsync,
      removeCouponAsync,
      recalculateShippingAsync,
      recalculateTaxesAsync,
    ].forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.isCartLoading = true;
      });

      builder.addCase(thunk.fulfilled, (state, action) => {
        state.cart = action.payload;
        localStorage.setItem('cart', JSON.stringify(state.cart));
        state.error = '';
        state.isCartLoading = false;
      });

      builder.addCase(thunk.rejected, (state, action) => {
        console.error(action.error);
        state.error = action.error.message ?? 'Oops, something went wrong!';
        state.isCartLoading = false;
      });
    });
  },
});

export const { setCart } = appSlice.actions as {
  setCart: ActionCreatorWithPayload<Cart, string>;
};
