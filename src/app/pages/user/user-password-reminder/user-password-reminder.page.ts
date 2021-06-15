import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {UserService} from '../../../services/userDao/user.service';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';

@Component({
  selector: 'app-user-password-reminder',
  templateUrl: './user-password-reminder.page.html',
  styleUrls: ['./user-password-reminder.page.scss'],
})
export class UserPasswordReminderPage implements OnInit {

  reminderForm: FormGroup;
  email: FormControl;
  error: string;
  constructor(public themeService: ThemeService,
              private router: Router,
              private toaster: ToasterServiceService,
              private userService: UserService) {
    this.reminderForm = new FormGroup({
      email: this.email = new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  onRemindPassword(authForm: FormGroup): void{
    this.reminderForm.disable();
    this.userService.passwordReminder(authForm.controls.email.value)
      .subscribe(data => {
          this.error = null;
        },
        (error => {
          if (error.status === 200){
            this.router.navigate(['/']).then(data1 => console.log(data1));
            this.themeService.data.value.message = 'Sending! Check your email';
            this.toaster.presentToast();
            this.reminderForm.enable();
          }
          this.error = error.error.tittle;
          this.reminderForm.enable();
        }));
  }

}
