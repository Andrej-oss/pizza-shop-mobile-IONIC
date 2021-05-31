import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DessertDetailPage } from './dessert-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DessertDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DessertDetailPageRoutingModule {}
