import { Component, OnInit } from '@angular/core';
import {Pizza} from '../../../models/Pizza';
import {Cart} from '../../../models/Cart';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {SnackService} from '../../../services/snackDao/snack.service';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {DessertService} from '../../../services/dessertDao/dessert.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {

  pizzas: Pizza[];
  cartElements: Cart[];
  principal = this.themeService.data.value.principle ;
  drinks: Drink[];
  snacks: Snack[];
  desserts: Dessert[];
  isOpenCart: boolean;
  isOpenAddressStep: boolean;
  isOpenPayment: boolean;
  constructor(private snackService: SnackService,
              private pizzaService: PizzaService,
              private dessertService: DessertService,
              private cartService: CartService,
              public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.data.value.isOpenPayment = false;
    this.isOpenCart = true;
    this.cartService.getAllCartsElements(this.themeService.data.value.userId)
      .subscribe(data => this.cartElements = data);
    this.snackService.getAllSnacks().subscribe(data => this.snacks = data);
    this.pizzaService.getAllPizza().subscribe(data => this.pizzas = data);
    this.dessertService.getAllDessert().subscribe(data => this.desserts = data);
  }

  onPayment(): void{
    this.themeService.data.value.isOpenPayment = true;
  }

  onAddressOpen(): void{
    this.isOpenPayment = false;
    this.isOpenCart = false;
    this.isOpenAddressStep =  !this.isOpenAddressStep;
  }

  backToCart(): void{
    this.isOpenPayment = false;
    this.isOpenCart = !this.isOpenCart;
    this.isOpenAddressStep =  false;
  }

  onOpenPayment() {
    this.isOpenPayment = !this.isOpenPayment;
    this.isOpenCart = false;
    this.isOpenAddressStep =  false;
  }
}
