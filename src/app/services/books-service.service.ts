import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(public http:HttpClient) { }

  public getBooks(){
    return this.http.get(
      'http://henri-potier.xebia.fr/books', {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }
}
