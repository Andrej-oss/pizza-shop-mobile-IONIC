import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPagePageRoutingModule } from './cart-page-routing.module';

import { CartPagePage } from './cart-page.page';
import {CartCardPageModule} from '../cart-card/cart-card.module';
import {PizzaDetailPageModule} from '../../pizza/pizza-detail/pizza-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPagePageRoutingModule,
    CartCardPageModule,
    PizzaDetailPageModule
  ],
  declarations: [CartPagePage]
})
export class CartPagePageModule {}
