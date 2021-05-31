import { Component, OnInit } from '@angular/core';
import {Cart} from '../../../models/Cart';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {ToasterServiceService} from '../../../services/toaster/toaster-service.service';
import {ActivatedRoute} from '@angular/router';
import {SnackService} from '../../../services/snackDao/snack.service';
import {Snack} from '../../../models/Snack';

@Component({
  selector: 'app-snack-detail',
  templateUrl: './snack-detail.page.html',
  styleUrls: ['./snack-detail.page.scss'],
})
export class SnackDetailPage implements OnInit {

  snacks: Snack[];
  url = 'http://localhost:8080/snack/';
  isPaymentOpen: boolean;
  cart: Cart;
  snack: Snack;
  snackId: number;
  constructor(public themeService: ThemeService,
              private cartService: CartService,
              private snackService: SnackService,
              private toaster: ToasterServiceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => this.snackId = data.id);
    if (this.snackId !== 0) {
      this.snackService.getSnack(this.snackId).subscribe(snack => this.snack = snack);
    }
  }

  saveSnackInCart(snack: Snack): void{
    this.cart = {
      description: snack.description,
      snackId: snack.id,
      amount: 1,
      price: snack.price,
      userId: this.themeService.data.value.userId,
      volume: +snack.volume.match(/[0-9]/gi).join('') + 0.00,
    };
    this.themeService.data.value.message = 'Snack added to cart';
    this.cartService.savePizzaInCart(this.cart).subscribe(data => {
      this.themeService.data.value.cartElements = data.length;
      this.toaster.presentToast();
    });
  }

  openPayment(snack: Snack): void{
    this.isPaymentOpen = !this.isPaymentOpen;
    this.snack = snack;
  }

}
