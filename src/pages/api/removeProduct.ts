import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@models/cart';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body) as { cart: Cart; removalId: string };
  const newProducts = body.cart.products?.filter(
    (p) => p.id !== body.removalId
  );

  res.status(200).json({
    ...body.cart,
    products: newProducts,
  } as Cart);
}
