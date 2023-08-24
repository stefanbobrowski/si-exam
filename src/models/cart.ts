import { Product } from './product';
import { Coupon } from './coupon';

export interface Cart {
  id: string;
  // QUESTION: What does the `?` do? Is it different than using | undefined in the type?
  // ANSWER: The ? makes means that the property can be undefined or null. React often throws errors if you try to access a property that is undefined.
  products?: Product[];
  coupons?: Coupon[];
  shippingPrice?: number;
  taxes?: number;
}
