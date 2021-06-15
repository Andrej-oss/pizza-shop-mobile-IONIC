import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart} from '../../../models/Cart';
import {Pizza} from '../../../models/Pizza';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {UserService} from '../../../services/userDao/user.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {APiURL} from '../../../config/configURL';

@Component({
  selector: 'app-cart-card-item',
  templateUrl: './cart-card-item.component.html',
  styleUrls: ['./cart-card-item.component.scss'],
})
export class CartCardItemComponent implements OnInit {
  @Input() cartElement: Cart;
  @Input() pizza: Pizza;
  @Input() totalPrice: number;
  @Input() drink: Drink;
  @Input() snack: Snack;
  @Input() dessert: Dessert;
  @Input() pizzaPrice: number;
  @Output()
  deletedItem: EventEmitter<any> = new EventEmitter<any>();
  url = APiURL.pizzaImage;
  count: number;
  price: number;
  cart: Cart;
  urlDrink = APiURL.drinkImage;
  urlSnack = APiURL.snackImage;
  urlDessert = APiURL.dessertImage;

  constructor(public themeService: ThemeService,
              private userService: UserService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartElement.amount !== null ? this.count = this.cartElement.amount : this.count = 1;
    this.price = this.cartElement.price;
    this.pizzaPrice = this.cartElement.price / this.cartElement.amount;
  }

  onInc(): void {
    try {
      if (this.pizza) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          pizzaId: this.cartElement.pizzaId,
          price: this.cartElement.price + this.pizzaPrice,
          amount: this.cartElement.amount + 1,
          size: this.cartElement.size
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cart = this.cartService.onIncCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price + this.pizzaPrice;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice + this.pizzaPrice;
      } else if (this.drink) {
        this.cart = {
          id: this.cartElement.id,
          pizzaId: 0,
          description: this.cartElement.description,
          drinkId: this.cartElement.drinkId,
          price: this.cartElement.price + this.drink.price,
          amount: this.cartElement.amount + 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cart = this.cartService.onIncCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price + this.drink.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice + this.drink.price;
      } else if (this.snack) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          snackId: this.cartElement.snackId,
          price: this.cartElement.price + this.snack.price,
          amount: this.cartElement.amount + 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cart = this.cartService.onIncCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price + this.snack.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice + this.snack.price;
      } else if (this.dessert) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          dessertId: this.cartElement.dessertId,
          price: this.cartElement.price + this.dessert.price,
          amount: this.cartElement.amount + 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cart = this.cartService.onIncCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price + this.dessert.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice + this.dessert.price;
      }
      //  todo this.userService.incAmountPizzaCartInStore(this.cartElement.id, this.cart);
      this.count = this.count + 1;
    } catch (e) {
      console.log(e);
    }
  }

  onDec(): void {
    try {
      if (this.pizza) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          pizzaId: this.cartElement.pizzaId,
          price: this.cartElement.price - this.pizzaPrice,
          amount: this.cartElement.amount - 1,
          size: this.cartElement.size
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cartService.onDecCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price - this.pizzaPrice;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice - this.pizzaPrice;
      } else if (this.drink) {
        this.cart = {
          id: this.cartElement.id,
          pizzaId: 0,
          description: this.cartElement.description,
          drinkId: this.cartElement.drinkId,
          price: this.cartElement.price - this.drink.price,
          amount: this.cartElement.amount - 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cartService.onDecCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price - this.drink.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice - this.drink.price;
      } else if (this.snack) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          snackId: this.cartElement.snackId,
          price: this.cartElement.price - this.snack.price,
          amount: this.cartElement.amount - 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cartService.onDecCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }   this.price = this.price - this.snack.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice - this.snack.price;
      } else if (this.dessert) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          dessertId: this.cartElement.dessertId,
          price: this.cartElement.price - this.dessert.price,
          amount: this.cartElement.amount - 1,
        };
        if (this.userService.isAuthenticated()) {
          this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        }else if (!this.userService.isAuthenticated()){
          this.cartService.onDecCartElementInLocalStorage(this.cart.description, this.pizzaPrice);
        }
        this.price = this.price - this.dessert.price;
        this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice - this.dessert.price;
      }
      this.count = this.count - 1;
    } catch (e) {
      console.log(e);
    }
  }

  onDelete(id: number, description: string): void {
    if (this.userService.isAuthenticated()) {
      this.cartService.deleteCart(id).subscribe(data => console.log(data));
      this.deletedItem.emit(id);
    }else {
      this.deletedItem.emit(description);
      this.themeService.data.value.cartElements --;
    }
    this.themeService.data.value.totalPrice = this.themeService.data.value.totalPrice - this.cartElement.price;
  }

}
