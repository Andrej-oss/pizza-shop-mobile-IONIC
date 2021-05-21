import {Ingredient} from './Ingredient';
import {Rating} from './Rating';
import {Avatar} from './Avatar';
import {Comment} from './Comment';

export interface Theme {
  userId: number;
  userName: string;
  avatar: Avatar;
  editedComment: Comment;
  isDarkTheme: boolean;
  ingredients: number[];
  ingredientsPizza: Ingredient[];
  pizzaName: string;
  pizzaDescription: string;
  pizzaPrice: number;
  pizzaRating: Rating[];
  comments: Comment[];
}
