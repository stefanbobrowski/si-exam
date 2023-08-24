import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@models/cart';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const productsPriceTotal =
    cart.products?.reduce((total, p) => total + p.price, 0) ?? 0;

  res.status(200).json({
    ...cart,
    taxes: ((cart?.shippingPrice ?? 0) + productsPriceTotal) * 0.06,
  } as Cart);
}
