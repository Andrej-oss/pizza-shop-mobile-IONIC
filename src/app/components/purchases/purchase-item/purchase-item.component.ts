import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {Observable} from 'rxjs';
import {Purchase} from '../../../models/Purchase';
import {Cart} from '../../../models/Cart';
import {UserService} from '../../../services/userDao/user.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {PurchaseService} from '../../../services/purchaseDao/purchase.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {Pizza} from '../../../models/Pizza';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent implements OnInit {
  @Input() pizzas: Pizza[];
  @Input() drinks: Drink[];
  @Input() snacks: Snack[];
  @Input() desserts: Dessert[];
  @Input() purchasesUser: Purchase[];
  source: string;
  purchases: Purchase[];
  displayedColumns: string[] = ['name', 'description', 'size', 'count', 'price', 'date', 'option'];
  blackTheme = 'purchase-item-black';
  whiteTheme = 'purchase-item';
  black = 'background-color: black';
  white = 'background-color: white';
  blackColor = 'color: white';
  whiteColor = 'color: black; ';
  cart: Cart;
  isUser: boolean;
  selectedValue: string;
  constructor(private userService: UserService,
              private cartService: CartService,
              private purchaseService: PurchaseService,
              public themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.source = 'purchase';
   // this.options = options;
    // if (!this.purchasesUser && !this.purchasesUser.length){
    // this.purchaseService.getPurchasesByUser(this.themeService.data.value.userId)
    //     .subscribe(data => this.purchasesUser = data);
    // console.log(this.purchasesUser);
    // }
  }

  onDelete(id: any): void {
    this.purchaseService.deletePurchase(id).subscribe(data => console.log(data));
  }

  saveInCart(id: number,
             drinkIdItem: number,
             dessertIdItem: number,
             descriptionPurchase: string,
             name: string,
             amountItem: number,
             priceItem: number,
             volumeItem: number): void {
    if (id !== 0) {
      this.cart = {
        description: descriptionPurchase,
        pizzaId: id,
        amount: amountItem,
        price: priceItem,
        userId: this.themeService.data.value.userId,
        size: name,
        volume: volumeItem
      };
    }
    if (drinkIdItem !== 0) {
      this.cart = {
        description: descriptionPurchase,
        drinkId: drinkIdItem,
        amount: amountItem,
        price: priceItem,
        userId: this.themeService.data.value.userId,
        size: name,
        volume: volumeItem
      };
    }
    if (dessertIdItem !== 0) {
      this.cart = {
        description: descriptionPurchase,
        dessertId: dessertIdItem,
        amount: amountItem,
        price: priceItem,
        userId: this.themeService.data.value.userId,
        size: name,
        volume: volumeItem
      };
    }
    console.log(this.cart);
    // this.themeService.data.value.message = 'Item added to cart';
    this.cartService.savePizzaInCart(this.cart);
  }

  onSortPurchase(value: string): void {
    const optionsArray = value.split(', ');
    this.purchaseService.getAllPurchases(0, optionsArray[0], optionsArray[1])
      .subscribe(data => this.purchases = data.purchases);
  }

  findDessertVolume(dessertId: number): string{
    const dessert = this.desserts.find(value => dessertId === value.id);
    return dessert.volume;
  }

  findSnackVolume(snackId: number): string{
    const snack = this.snacks.find(value => snackId === value.id);
    return snack.volume ;
  }

}
