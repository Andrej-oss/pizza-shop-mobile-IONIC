import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DessertDetailPageRoutingModule } from './dessert-detail-routing.module';

import { DessertDetailPage } from './dessert-detail.page';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';
import {PaymentModule} from '../../../components/payment-stripe/payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DessertDetailPageRoutingModule,
    PaymentModule,
  ],
  declarations: [DessertDetailPage]
})
export class DessertDetailPageModule {}
