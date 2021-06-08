import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {UserService} from '../../../services/userDao/user.service';
import {Cart} from '../../../models/Cart';
import {Drink} from '../../../models/Drink';
import {DessertService} from '../../../services/dessertDao/dessert.service';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';
import {DrinkService} from '../../../services/drinkDao/drink.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {ActivatedRoute} from '@angular/router';
import {PaymentComponent} from '../../../components/payment-stripe/payment/payment.component';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.page.html',
  styleUrls: ['./drink-detail.page.scss'],
})
export class DrinkDetailPage implements OnInit {

  drinks: Drink[];
  url = 'http://localhost:8080/drink/';
  isPaymentOpen: boolean;
  cart: Cart;
  drink: Drink;
  drinkId: number;
  constructor(public themeService: ThemeService,
              private cartService: CartService,
              private drinkService: DrinkService,
              private toaster: ToasterServiceService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => this.drinkId = data.id);
    if (this.drinkId !== 0) {
      this.drinkService.getDrink(this.drinkId).subscribe(drink => this.drink = drink);
    }
  }

  saveDrinkInCart(drink: Drink): void{
    this.cart = {
      description: drink.name,
      drinkId: drink.id,
      amount: 1,
      price: drink.price,
      userId: this.themeService.data.value.userId,
      volume: drink.volume,
    };
    if (!this.userService.isAuthenticated()){
      this.userService.saveCartInLocalStorage(this.cart);
      this.themeService.data.value.message = 'Drink added to cart';
    }else if (!!this.userService.isAuthenticated()) {
      this.themeService.data.value.message = 'Drink added to cart';
      this.cartService.savePizzaInCart(this.cart).subscribe(data => {
        this.themeService.data.value.cartElements = data.length;
        this.toaster.presentToast();
      });
    }
  }

  openPayment(drink: Drink): void{
    this.isPaymentOpen = !this.isPaymentOpen;
    this.drink = drink;
  }

}
