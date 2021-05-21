import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../models/Ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent implements OnInit {
@Input()
ingredient: Ingredient;
  @Input()
  isActive: boolean;
  url = 'http://localhost:8080/ingredient/image/';
  constructor() { }

  ngOnInit() {}

}
