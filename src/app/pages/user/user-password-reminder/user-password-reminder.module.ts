import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPasswordReminderPageRoutingModule } from './user-password-reminder-routing.module';

import { UserPasswordReminderPage } from './user-password-reminder.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPasswordReminderPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UserPasswordReminderPage]
})
export class UserPasswordReminderPageModule {}
