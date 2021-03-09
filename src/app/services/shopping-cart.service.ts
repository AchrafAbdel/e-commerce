import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService  {

  public cartListSubject = new BehaviorSubject([]);

  addToCart = (book: Book) => {
      const current = this.cartListSubject.getValue();
      const dup = current.find(c => c.title === book.title);
      if (!dup) {
        current.push(book);
      }
      this.cartListSubject.next(current);
  }
  reloadCart = (cartList) => {
      this.cartListSubject.next(cartList);
  }
  removeCart = index => {
      const current = this.cartListSubject.getValue();
      current.splice(index, 1);
      this.cartListSubject.next(current);
  }
}
