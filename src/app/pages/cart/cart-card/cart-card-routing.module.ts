import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartCardPage } from './cart-card.page';

const routes: Routes = [
  {
    path: '',
    component: CartCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartCardPageRoutingModule {}
