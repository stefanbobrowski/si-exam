import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@models/cart';

export default async function handler(
  req: NextApiRequest,
  // QUESTION: Why might we prefer unknown here instead of any?
  // ANSWER: unknown makes you check the type before using it
  res: NextApiResponse<any>
) {
  const cart = JSON.parse(req.body) as Cart;
  const now = Date.now();
  const id = (now / 1000).toFixed(0) + '-' + Math.random().toFixed(2);

  try {
    res.status(200).json({
      // QUESTION: What does the '...' operator do?
      // ANSWER: It spreads the cart object into the new object, here just saying that the cart object is the same as the old one
      ...cart,
      // QUESTION: What does the '??' operator do?
      //           What values of cart.products would cause '[]` to be used for the concat call?
      // ANSWER:  The ?? operator is the nullish coalescing operator. It returns the right hand side if the left hand side is null or undefined.
      products: (cart.products ?? []).concat({
        id,
        name: `Product-${id}`,
        price: now % 2 === 0 ? 56 * Math.random() : 65 * Math.random(),
      }),
    } as Cart);
  } catch (error) {
    console.log('Error: ', error);
  }
}
