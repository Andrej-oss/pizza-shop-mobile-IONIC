import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzaPageRoutingModule } from './pizza-routing.module';

import { PizzaPage } from './pizza.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PizzaPageRoutingModule
  ],
  declarations: [PizzaPage]
})
export class PizzaPageModule {}
