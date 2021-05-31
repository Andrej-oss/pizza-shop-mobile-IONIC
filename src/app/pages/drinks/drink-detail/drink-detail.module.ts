import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinkDetailPageRoutingModule } from './drink-detail-routing.module';

import { DrinkDetailPage } from './drink-detail.page';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';
import {AppModule} from '../../../app.module';
import {PaymentModule} from '../../../components/payment-stripe/payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinkDetailPageRoutingModule,
    PaymentModule,
  ],
  declarations: [DrinkDetailPage]
})
export class DrinkDetailPageModule {}
