import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Theme} from '../../app/models/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
data: BehaviorSubject<Theme> = new BehaviorSubject<Theme>({
  userId: 0,
  userName: '',
  avatar: null,
  principle: null,
  isOpenPayment: false,
  editedComment: null,
  isDarkTheme: false,
  ingredients: [],
  ingredientsPizza: [],
  pizzaName: '',
  pizzaDescription: '',
  pizzaPrice: 0,
  pizzaRating: [],
  comments: [],
  totalPrice: 0,
});
  constructor() { }
}
