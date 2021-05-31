import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SnackDetailPageRoutingModule } from './snack-detail-routing.module';

import { SnackDetailPage } from './snack-detail.page';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';
import {PaymentModule} from '../../../components/payment-stripe/payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SnackDetailPageRoutingModule,
    PaymentModule,
  ],
  declarations: [SnackDetailPage]
})
export class SnackDetailPageModule {}
