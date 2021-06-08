import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {UserService} from '../../../services/userDao/user.service';
import {Dessert} from '../../../models/Dessert';
import {Cart} from '../../../models/Cart';
import {CartService} from '../../../services/cartDao/cart.service';
import {DessertService} from '../../../services/dessertDao/dessert.service';
import {ActivatedRoute} from '@angular/router';
import {mergeMap, tap} from 'rxjs/operators';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';

@Component({
  selector: 'app-dessert-detail',
  templateUrl: './dessert-detail.page.html',
  styleUrls: ['./dessert-detail.page.scss'],
})
export class DessertDetailPage implements OnInit {

  desserts: Dessert[];
  url = 'http://localhost:8080/dessert/';
  isPaymentOpen: boolean;
  cart: Cart;
  dessert: Dessert;
  cartElements: Cart[];
  dessertId: number;
  constructor(public themeService: ThemeService,
              private cartService: CartService,
              private dessertService: DessertService,
              private toaster: ToasterServiceService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    debugger;
    this.route.params.subscribe(data => this.dessertId = data.id);
    this.dessertService.getDessert(this.dessertId).subscribe(data => this.dessert = data);
  }

  saveDessertInCart(dessert: Dessert): void{
    this.cart = {
      description: dessert.name,
      dessertId: dessert.id,
      amount: 1,
      price: dessert.price,
      userId: this.themeService.data.value.userId,
      volume: +dessert.volume.match(/[0-9]/gi).join('') + 0.00,
    };
    if (!this.userService.isAuthenticated()){
      this.userService.saveCartInLocalStorage(this.cart);
      this.themeService.data.value.message = 'Dessert added to cart';
    }else if (!!this.userService.isAuthenticated()) {
      this.cartService.savePizzaInCart(this.cart).subscribe(data => {
        this.cartElements = data;
        this.themeService.data.value.cartElements = data.length;
        this.themeService.data.value.message = 'Dessert added to cart';
        this.toaster.presentToast();
      });
    }
  }

  openPayment(dessert: Dessert): void{
    this.isPaymentOpen = !this.isPaymentOpen;
    this.dessert = dessert;
  }

}
