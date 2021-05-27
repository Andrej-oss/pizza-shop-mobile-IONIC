import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../../models/Drink';
import {Pizza} from '../../../models/Pizza';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';

@Component({
  selector: 'app-purchase-item-card',
  templateUrl: './purchase-item-card.component.html',
  styleUrls: ['./purchase-item-card.component.scss'],
})
export class PurchaseItemCardComponent implements OnInit {

  @Input() pizzaId: number;
  @Input() drinkId: number;
  @Input() snackId: number;
  @Input() dessertId: number;
  url = 'http://localhost:8080/pizza/image/';
  urlDrink = 'http://localhost:8080/drink/';
  urlSnack = 'http://localhost:8080/snack/';
  urlDessert = 'http://localhost:8080/dessert/';
  @Input() pizzas: Pizza[];
  @Input() drinks: Drink[];
  @Input() snacks: Snack[];
  @Input() desserts: Dessert[];
  item: Pizza | Drink | Snack | Dessert;
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.findItem();
  }
  findItem(): void{
    if (this.pizzaId !== 0){
      this.item = this.pizzas.find(value => value.id === +this.pizzaId);
    }
    else if (this.drinkId !== 0){
      this.item = this.drinks.find(value => value.id === +this.drinkId);
    }
    else if (this.snackId !== 0){
      this.item = this.snacks.find(value => value.id === +this.snackId);
    }
    else if (this.dessertId !== 0){
      this.item = this.desserts.find(value => this.dessertId === value.id);
    }
  }

}
