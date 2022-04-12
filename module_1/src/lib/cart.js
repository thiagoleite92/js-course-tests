import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';
import { calculateDiscount } from './discount.utils';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    const doTheMath = (acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });

      let discount = Money({ amount: 0 });

      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }

      return acc.add(amount).subtract(discount);
    };

    return this.items.reduce(doTheMath, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.toFormat('$0,0.00');
    const items = this.items;

    return {
      total,
      formatted,
      items,
    };
  }

  checkout() {
    const checkOut = this.summary();

    this.items = [];

    return checkOut;
  }
}
