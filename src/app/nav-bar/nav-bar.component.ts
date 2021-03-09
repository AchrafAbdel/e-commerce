import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public collapse = false;
  public cartBadgeNumber: number;
  constructor( private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
      this.shoppingCartService.cartListSubject
          .subscribe(res => {
              this.cartBadgeNumber = res.length;
          });
  }
}
