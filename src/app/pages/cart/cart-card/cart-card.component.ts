import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart} from '../../../models/Cart';
import {Pizza} from '../../../models/Pizza';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';


@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent implements OnInit {

  @Input() cartElements: Cart[];
  @Input() pizzas: Pizza[];
  @Input() drinks: Drink[];
  @Input() snacks: Snack[];
  @Input() desserts: Dessert[];
  @Output() deletedCartItem: EventEmitter<number> = new EventEmitter<number>();
  deletedIdCert: number;
  pizzasPrise: {id: number, price: number}[] = [];
  totalPrice: number;

  constructor(public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.totalPrice = 0;
    this.themeService.data.value.totalPrice = 0;
    this.getTotalPrice();
    this.cartElements.forEach(value => {
      if (value.pizzaId > 0){
        const pizzaPrice = {id: value.id, price: value.price};
        this.pizzasPrise.push(pizzaPrice);
      }
    });
    this.pizzasPrise.forEach(value => console.log(value));
  }
  getTotalPrice(): void{
    this.totalPrice = +this.cartElements.reduce((previousValue, currentValue) => {
      return  previousValue + currentValue.price; }, 0);
    this.themeService.data.value.totalPrice = this.totalPrice;
  }

  onDeleteCart(id: number): void{
    this.deletedCartItem.emit(id);
  }
}
