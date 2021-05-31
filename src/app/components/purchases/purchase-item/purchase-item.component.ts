import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';

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
  @Output()
  deletedPurchaseId: EventEmitter<number> = new EventEmitter<number>();
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
              private toaster: ToasterServiceService,
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
    this.purchaseService.deletePurchase(id).subscribe(data => {
      if (data){
        this.deletedPurchaseId.emit(id);
      }
    });
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
    this.cartService.savePizzaInCart(this.cart).subscribe(data => {
      if (data){
        this.themeService.data.value.message = 'Your purchase added to cart';
        this.themeService.data.value.cartElements += this.themeService.data.value.cartElements;
        this.toaster.presentToast();
      }
  });
  }

  onSortPurchase(value: string): void {
    const optionsArray = value.split(', ');
    this.purchaseService.getAllPurchases(0, optionsArray[0], optionsArray[1])
      .subscribe(data => this.purchases = data.purchases);
  }

  findDessertVolume(dessertId: number): string {
    const dessert = this.desserts.find(value => dessertId === value.id);
    return dessert.volume;
  }

  findSnackVolume(snackId: number): string {
    const snack = this.snacks.find(value => snackId === value.id);
    return snack.volume;
  }

}
