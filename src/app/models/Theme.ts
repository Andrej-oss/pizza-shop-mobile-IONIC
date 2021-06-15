import {Ingredient} from './Ingredient';
import {Rating} from './Rating';
import {Avatar} from './Avatar';
import {Comment} from './Comment';
import {User} from './User';
import {Pizza} from './Pizza';

export interface Theme {
  userId: number;
  userName: string;
  usersPizzaRating: Rating[];
  avatar: Avatar;
  principle: User;
  totalPrice: number;
  editedComment: Comment;
  isOpenPayment: boolean;
  isDarkTheme: boolean;
  ingredients: number[];
  ingredientsPizza: Ingredient[];
  pizza: Pizza;
  pizzaPrice: number;
  pizzaRating: Rating[];
  comments: Comment[];
  cartElements: number;
  message: string;
}
