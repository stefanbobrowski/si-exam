import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@models/cart';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const couponsTotal =
    cart.coupons?.reduce((total, c) => total + c.discount, 0) ?? 0;
  const productsPriceTotal =
    cart.products?.reduce((total, p) => total + p.price, 0) ?? 0;
  const totalPrice = productsPriceTotal - couponsTotal;

  res.status(200).json({
    ...cart,
    shippingPrice: totalPrice * 0.05,
  } as Cart);
}
