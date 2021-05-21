import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPasswordReminderPage } from './user-password-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: UserPasswordReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPasswordReminderPageRoutingModule {}
