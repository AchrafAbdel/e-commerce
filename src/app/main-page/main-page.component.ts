import { BooksService } from './../services/books-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public books: Array<Book>;
  private sub;
  constructor(
       private booksService: BooksService,
       private shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit() {
      this.load();
  }
  load = () => {
     this.sub = this.booksService.getBooks()
          .subscribe(
            (res: Response) => this.books = res as any,
            error => console.log(error)
          );
  }
  addToCart = (book) => {
      this.shoppingCartService.addToCart(book);
  }
  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}
