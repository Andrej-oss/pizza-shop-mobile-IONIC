import {Component, OnDestroy, OnInit, Output} from '@angular/core';
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
import {DrinkService} from '../../../services/drinkDao/drink.service';
import {UserService} from '../../../services/userDao/user.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit, OnDestroy {

  pizzas: Pizza[];
  cartElements: Cart[];
  principal = this.themeService.data.value.principle ;
  drinks: Drink[];
  snacks: Snack[];
  desserts: Dessert[];
  isOpenCart = false;
  isOpenAddressStep = false;
  isOpenPayment = false;
  constructor(private snackService: SnackService,
              private pizzaService: PizzaService,
              private dessertService: DessertService,
              private userService: UserService,
              private drinkService: DrinkService,
              private cartService: CartService,
              public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.data.value.isOpenPayment = false;
    this.isOpenCart = true;
    this.snackService.getAllSnacks().subscribe(data => this.snacks = data);
    this.pizzaService.getAllPizza().subscribe(data => this.pizzas = data);
    this.dessertService.getAllDessert().subscribe(data => this.desserts = data);
    this.drinkService.getAllDrinks().subscribe(data => this.drinks = data);
    this.cartElements = [];
    if (this.userService.isAuthenticated()) {
      this.cartService.getAllCartsElements(this.themeService.data.value.userId)
        .subscribe(data => this.cartElements = data);
    }
    else if (!this.userService.isAuthenticated()){
      const cartFromLocalStorage = this.cartService.getCartFromLocalStorage();
      if (cartFromLocalStorage.length){
        this.cartElements = cartFromLocalStorage;
      }
    }
  }

  onPayment(): void{
    this.themeService.data.value.isOpenPayment = true;
  }

  onAddressOpen(): void{
    this.isOpenPayment = false;
    this.isOpenCart = false;
    this.isOpenAddressStep =  true;
  }

  backToCart(): void{
    this.isOpenPayment = false;
    this.isOpenCart = true;
    this.isOpenAddressStep =  false;
  }

  onOpenPayment() {
    this.isOpenPayment = true;
    this.isOpenCart = false;
    this.isOpenAddressStep =  false;
  }

  backToAddressStep() {
    this.isOpenPayment = false;
    this.isOpenCart = false;
    this.isOpenAddressStep =  true;
  }

  onDeleteCartItem(id: any) {
    if ( typeof id === 'number' ) {
      const index = this.cartElements.findIndex(value => value.id === id);
      this.cartElements.splice(index, 1);
      this.themeService.data.value.cartElements --;
    }else if (!!id.length) {
      this.cartElements = this.cartService.deleteCartElementFromLocalStorage(id);
    }
  }

  ngOnDestroy(): void {
    this.cartElements = [];
  }
}
