import { Component } from '@angular/core';
import {ThemeService} from '../theme/behaviour-subject/theme.service';
import {Router} from '@angular/router';
import {UserService} from './services/userDao/user.service';
import {ToasterServiceService} from './services/toaster/toaster-service.service';
import {APiURL} from './config/configURL';
import {Cart} from './models/Cart';
import {CartService} from './services/cartDao/cart.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  avatarUrl = APiURL.avatarImage;
  avatarUser: string;
  cartElements: Cart[] = [];

  constructor(public themeService: ThemeService,
              private toaster: ToasterServiceService,
              private cartService: CartService,
              private userService: UserService,
              private router: Router) {
    this.themeService.data.value.avatar
      ? this.avatarUser =  this.themeService.data.value.avatar.path
      : this.avatarUser = '';
    if (!userService.isAuthenticated()){
      const cartFromLocalStorage = this.cartService.getCartFromLocalStorage();
      if (cartFromLocalStorage.length){
        this.cartElements = cartFromLocalStorage;
      }
      this.themeService.data.value.cartElements = this.cartElements.length;
    }
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
