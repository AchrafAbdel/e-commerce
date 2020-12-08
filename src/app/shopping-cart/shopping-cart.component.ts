import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCartList:Book[];
  public totalPrice: number;
  public newTotalPrice: number;
  public idBooks: string;
  public promotionValue : number;
  constructor(protected cartService: ShoppingCartService,public http:HttpClient) {
    this.loadCart();
    this.applyPromotion();
  }

  ngOnInit() {

  }
  loadCart = () => {
    this.cartService.cartListSubject
      .subscribe(res => {
        this.shoppingCartList = res;
        let total = 0;
        this.idBooks = '';
        for(let cart of this.shoppingCartList) {
            total += cart.price;
            this.idBooks += cart.isbn + ',';
        }
        this.totalPrice = total;
        this.newTotalPrice = total;
      });
      
  };
  removeFromCart = index => {
    this.cartService.removeCart(index);
    this.applyPromotion();
    
  };
  applyPromotion(){
    if (this.idBooks){
      this.idBooks = this.idBooks.slice(0, -1);
      this.http.get(
        'http://henri-potier.xebia.fr/books/' + this.idBooks + '/commercialOffers', {
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).subscribe(
          res => {
            let promotion = res as any;
            this.newTotalPrice = this.choosePromotion(promotion.offers, this.totalPrice); 
          },
          error => console.log(error)
        );
    }
  }

  choosePromotion(array, price:number){
    let numbers= new Array<number>(3);
    for (let i=0; i< array.length; i++){
      if (array[i].type === 'percentage') {
        numbers[i] = price - ( price * array[i].value * 1/100);
      }
      if (array[i].type === 'minus') {
        numbers[i] = price - array[i].value;
      }
      if (array[i].type === 'slice') {
        numbers[i] = price - Math.floor(price/array[i].sliceValue) * array[i].value;
      }
    }
    return Math.min.apply(null,numbers);
  }
}
