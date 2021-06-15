import { Component, OnInit } from '@angular/core';
import {Pizza} from '../../../models/Pizza';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {IngredientService} from '../../../services/ingredientDao/ingredient.service';
import {AvatarService} from '../../../services/avatarDao/avatar.service';
import {CommentService} from '../../../services/commentDao/comment.service';
import {APiURL} from '../../../config/configURL';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {
  pizzas: Pizza[];
  pizza: Pizza;
  url = APiURL.pizzaImage;
  constructor(private pizzaService: PizzaService,
              public themeService: ThemeService,
              private commentService: CommentService,
              private ingredientService: IngredientService,
              private router: Router) { }

  ngOnInit() {
    this.pizzaService.getAllPizza().subscribe(data => this.pizzas = data);
    if (!this.themeService.data.value.ingredientsPizza.length){
      this.ingredientService.getAllIngredients().subscribe(data => this.themeService.data.value.ingredientsPizza = data);
    }
  }

  onPizzaDetail(id): void{
    this.pizza = this.pizzas.find(value => value.id === id);
    if (!!this.pizza){
      let array = [];
      array = this.pizza.ingredients.split(',');
      this.themeService.data.value.ingredients = array;
      this.themeService.data.value.pizza = this.pizza;
      this.themeService.data.value.pizzaPrice = this.pizza.price;
      this.themeService.data.value.pizzaRating = this.pizza.rating;
    }
    this.router.navigate([`pizza/${id}`]);
  }
}
