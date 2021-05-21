import { Component, OnInit } from '@angular/core';
import {DrinkService} from '../../services/drinkDao/drink.service';
import {Drink} from '../../models/Drink';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit {
drinks: Drink[];
  url = 'http://localhost:8080/drink/';
  constructor(private drinkService: DrinkService) { }

  ngOnInit() {
    this.drinkService.getAllDrinks().subscribe(data => this.drinks = data);
  }

}
