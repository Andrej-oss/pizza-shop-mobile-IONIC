import {Component, OnInit} from '@angular/core';
import {PizzaService} from '../../services/pizzaDao/pizza.service';
import {DessertService} from '../../services/dessertDao/dessert.service';
import {DrinkService} from '../../services/drinkDao/drink.service';
import {Pizza} from '../../models/Pizza';
import {Dessert} from '../../models/Dessert';
import {Snack} from '../../models/Snack';
import {Drink} from '../../models/Drink';
import {ThemeService} from '../../../theme/behaviour-subject/theme.service';
import {APiURL} from '../../config/configURL';
import {Router} from '@angular/router';
import {SnackService} from '../../services/snackDao/snack.service';
import {IngredientService} from '../../services/ingredientDao/ingredient.service';
import {RatingService} from '../../services/ratingDao/rating.service';
import {UserService} from '../../services/userDao/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  pizzas: Pizza[];
  desserts: Dessert[];
  snacks: Snack[];
  drinks: Drink[];
  url = APiURL.pizzaImage;
  pizza: Pizza;
  urlDessert = APiURL.dessertImage;
  urlDrink = APiURL.drinkImage;
  urlSnack = APiURL.snackImage;

  constructor(private pizzaService: PizzaService,
              private drinkService: DrinkService,
              private snackService: SnackService,
              private ingredientService: IngredientService,
              private router: Router,
              public themeService: ThemeService,
              private dessertService: DessertService) {
  }

  ngOnInit() {
    if (!this.themeService.data.value.usersPizzaRating.length) {
    }
    this.pizzaService.getSortedPizzas(1, 'desc', 'ordersCount')
      .subscribe(value => this.pizzas = value.pizzas);
    this.snackService.getAllSnacks().subscribe(value => this.snacks = value);
    this.drinkService.getAllDrinks().subscribe(value => this.drinks = value);
    this.dessertService.getAllDessert().subscribe(value => this.desserts = value);
    if (!this.themeService.data.value.ingredientsPizza.length) {
      this.ingredientService.getAllIngredients().subscribe(data => this.themeService.data.value.ingredientsPizza = data);
    }
  }

  onPizzaDetail(id: number): void {
    this.pizza = this.pizzas.find(value => value.id === id);
    if (!!this.pizza) {
      let array = [];
      array = this.pizza.ingredients.split(',');
      this.themeService.data.value.ingredients = array;
      this.themeService.data.value.pizza = this.pizza;
      this.themeService.data.value.pizzaPrice = this.pizza.price;
      this.themeService.data.value.pizzaRating = this.pizza.rating;
    }
    this.router.navigate([`pizza/${id}`]);
  }

  chooseDessert(id: number): void {
    this.router.navigate([`dessert/${id}`]);
  }

  chooseDrink(id: number) {
    this.router.navigate([`drink/${id}`]);
  }

  chooseSnack(id: number): void {
    this.router.navigate([`snack/${id}`]);
  }

  onShowMorePizza(): void {
    this.router.navigate([`pizza`]);
  }

  onShowMoreDesserts(): void {
    this.router.navigate([`dessert`]);
  }

  onShowMoreDrinks(): void {
    this.router.navigate([`drinks`]);
  }

  onShowMoreSnacks(): void {
    this.router.navigate([`snack`]);
  }
}
