import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroupName, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPagePage } from './cart-page.page';
import {CartCardItemComponent} from '../cart-card-item/cart-card-item.component';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';
import {CartCardComponent} from '../cart-card/cart-card.component';
import { CartPagePageRoutingModule } from './cart-page-routing.module';
import {AppModule} from '../../../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPagePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CartPagePage, CartCardItemComponent, CartCardComponent, PaymentComponent]
})
export class CartPagePageModule {}
