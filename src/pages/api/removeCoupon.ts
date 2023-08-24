import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@models/cart';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body) as { cart: Cart; removalId: string };
  const newCoupons = body.cart.coupons?.filter((c) => c.id !== body.removalId);

  res.status(200).json({
    ...body.cart,
    coupons: newCoupons,
  } as Cart);
}
