import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainPageComponent,
    BookDescriptionComponent,
    ShoppingCartComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', 
        component: MainPageComponent
      },{
        path: 'book/:id/:title',
        component: BookDescriptionComponent
      },{
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },{
        path: '**',
        component: PageNotFoundComponent
      }  
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
