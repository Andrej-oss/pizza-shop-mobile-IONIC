import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../../models/Cart';
import {Pizza} from '../../../models/Pizza';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.page.html',
  styleUrls: ['./cart-card.page.scss'],
})
export class CartCardPage implements OnInit {

  @Input() cartElements: Cart[];
  @Input() pizzas: Pizza[];
  @Input() drinks: Drink[];
  @Input() snacks: Snack[];
  @Input() desserts: Dessert[];
  pizzasPrise: {id: number, price: number}[] = [];
  totalPrice: number;

  constructor(public themeService: ThemeService) {
  }

  ngOnInit(): void {
    console.log(this.cartElements);
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

}
