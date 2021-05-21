import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaDetailPageRoutingModule } from './pizza-detail-routing.module';

import { PizzaDetailPage } from './pizza-detail.page';
import {IngredientComponent} from '../../../components/ingredient/ingredient.component';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';
import {PaymentModalComponent} from '../../../components/payment-stripe/payment-modal/payment-modal.component';
import {StarsComponent} from '../../../components/stars/stars.component';
import {CommentComponent} from '../../../components/comment/comment-card/comment.component';
import {CommentFormComponent} from '../../../components/comment/comment-form/comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzaDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PizzaDetailPage,
    IngredientComponent,
    StarsComponent,
    PaymentComponent,
    PaymentModalComponent, CommentComponent, CommentFormComponent]
})
export class PizzaDetailPageModule {}
