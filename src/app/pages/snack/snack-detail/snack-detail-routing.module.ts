import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnackDetailPage } from './snack-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SnackDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SnackDetailPageRoutingModule {}
