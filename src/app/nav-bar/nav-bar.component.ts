import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public collapse: boolean = false;
  public cartBadgeNumber:number;
  constructor( private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
      this.shoppingCartService.cartListSubject
          .subscribe(res => {
              this.cartBadgeNumber = res.length;
          })
  }
}
