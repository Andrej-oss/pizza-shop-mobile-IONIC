import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartCardPageRoutingModule } from './cart-card-routing.module';

import { CartCardPage } from './cart-card.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartCardPageRoutingModule
    ],
    exports: [
        CartCardPage
    ],
    declarations: [CartCardPage]
})
export class CartCardPageModule {}
