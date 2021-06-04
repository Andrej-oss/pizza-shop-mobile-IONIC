import { Component } from '@angular/core';
import {ThemeService} from '../theme/behaviour-subject/theme.service';
import {Router} from '@angular/router';
import {UserService} from './services/userDao/user.service';
import {ToasterServiceService} from './services/toaster/toaster-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  avatarUrl = 'http://localhost:8080/avatar/image/';
  avatarUser: string;

  constructor(public themeService: ThemeService,
              private toaster: ToasterServiceService,
              private userService: UserService,
              private router: Router) {
    this.themeService.data.value.avatar
      ? this.avatarUser =  this.themeService.data.value.avatar.path
      : this.avatarUser = '';
  }

  onUserPage(): void{
    this.router.navigate(['user-page']);
  }

  onLogOut(): void{
    this.themeService.data.value.message = 'Good bye! ' + this.themeService.data.value.userName;
    this.toaster.presentToast();
    this.userService.logOut();
  }

  onDarkTheme(): void{
    this.themeService.data.value.isDarkTheme = !this.themeService.data.value.isDarkTheme;
  }

  onHomePage(): void{
    this.router.navigate(['home']);
  }
}
