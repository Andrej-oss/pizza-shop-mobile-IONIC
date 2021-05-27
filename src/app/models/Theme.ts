import {Ingredient} from './Ingredient';
import {Rating} from './Rating';
import {Avatar} from './Avatar';
import {Comment} from './Comment';
import {User} from './User';

export interface Theme {
  userId: number;
  userName: string;
  avatar: Avatar;
  principle: User;
  totalPrice: number;
  editedComment: Comment;
  isOpenPayment: boolean;
  isDarkTheme: boolean;
  ingredients: number[];
  ingredientsPizza: Ingredient[];
  pizzaName: string;
  pizzaDescription: string;
  pizzaPrice: number;
  pizzaRating: Rating[];
  comments: Comment[];
  cartElements: number;
  message: string;
}
