import { BooksService } from './../services/books-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css']
})
export class BookDescriptionComponent implements OnInit {

  private sub;
  public books:Array<Book>;
  public book:Book;
  quantity: number = 1;
  constructor(private route: ActivatedRoute,
              private bookservice:BooksService,
              private shoppingCartService:ShoppingCartService
  ) { }

  ngOnInit() {
      this.route.paramMap
          .subscribe(res => {
              this.getBook(res.get('id'));   
          })
  }
  getBook = (id) => {
      this.sub = this.bookservice.getBooks()
          .subscribe(
            (res: Response)  => {
              this.books = res as any;
              this.book = this.books.find(b => b.isbn === id);
            },
            error => console.log(error)
          )
  };
    addToCart = (book) => {
        this.shoppingCartService.addToCart(book);
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
}
