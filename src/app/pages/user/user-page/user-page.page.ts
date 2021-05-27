import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Avatar} from '../../../models/Avatar';
import {User} from '../../../models/User';
import {UserService} from '../../../services/userDao/user.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {PurchaseService} from '../../../services/purchaseDao/purchase.service';
import {Purchase} from '../../../models/Purchase';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {SnackService} from '../../../services/snackDao/snack.service';
import {DessertService} from '../../../services/dessertDao/dessert.service';
import {DrinkService} from '../../../services/drinkDao/drink.service';
import {Snack} from '../../../models/Snack';
import {Pizza} from '../../../models/Pizza';
import {Dessert} from '../../../models/Dessert';
import {Drink} from '../../../models/Drink';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {

  userFormData: FormData = new FormData();
  isCartOpen = false;
  isUpdateInfoOpen = false;
  isPurchasesOpen = false;
  isUserInfoOpen = true;
  isAvatarOpen: boolean;
  image: File;
  avatar: Avatar;
  avatarUrl = 'http://localhost:8080/avatar/image/';
  user: User;
  purchases: Purchase[];
  snacks: Snack[];
  pizzas: Pizza[];
  desserts: Dessert[];
  drinks: Drink[];

  constructor(private userService: UserService,
              private router: Router,
              private pizzaService: PizzaService,
              private snackService: SnackService,
              private dessertService: DessertService,
              private drinkService: DrinkService,
              private purchasesService: PurchaseService,
              public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.purchasesService.getPurchasesByUser(this.themeService.data.value.userId)
      .subscribe(data => this.purchases = data);
    this.pizzaService.getAllPizza().subscribe(data => this.pizzas = data);
    this.snackService.getAllSnacks().subscribe(data => this.snacks = data);
    this.dessertService.getAllDessert().subscribe(data => this.desserts = data);
    this.drinkService.getAllDrinks().subscribe(data => this.drinks = data);
  }

  onBasket(): void {
    this.router.navigate(['cart-page']);
  }

  onUserUpdate(): void {
    this.isUpdateInfoOpen = !this.isUpdateInfoOpen;
    this.isCartOpen = false;
    this.isPurchasesOpen = false;
    this.router.navigate(['user-registration']);
  }

  onPurchase(): void {
    this.isPurchasesOpen = true;
    this.isCartOpen = false;
    this.isUpdateInfoOpen = false;
    this.isUserInfoOpen = false;
  }

}
