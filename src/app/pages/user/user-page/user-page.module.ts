import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPagePageRoutingModule } from './user-page-routing.module';

import { UserPagePage } from './user-page.page';
import {UserRegistrationPageModule} from '../user-registration/user-registration.module';
import {PurchaseItemComponent} from '../../../components/purchases/purchase-item/purchase-item.component';
import {PurchaseItemCardComponent} from '../../../components/purchases/purchase-item-card/purchase-item-card.component';
import {AppModule} from '../../../app.module';
import {VolumeDrinkPipe} from '../../../pipes/volumeDrink/volume-drink.pipe';
import {UserCardComponent} from '../../../components/user-card/user-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPagePageRoutingModule,
    UserRegistrationPageModule,
  ],
  declarations: [UserPagePage,
    PurchaseItemComponent,
    UserCardComponent,
    PurchaseItemCardComponent,
    VolumeDrinkPipe]
})
export class UserPagePageModule {}
