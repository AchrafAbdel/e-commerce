import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public cartListSubject = new BehaviorSubject([]);

  addToCart = (book:Book) => {
      let current = this.cartListSubject.getValue();
      let dup = current.find(c=>c.title === book.title);
      if(!dup) current.push(book);
      this.cartListSubject.next(current);
  };
  reloadCart = (cartList) => {
      this.cartListSubject.next(cartList);
  };
  removeCart = index => {
      let current = this.cartListSubject.getValue();
      current.splice(index,1);
      this.cartListSubject.next(current);
  };
}
