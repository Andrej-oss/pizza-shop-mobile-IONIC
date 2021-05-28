import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../../models/Purchase';
import {PaymentService} from '../../../services/paymentDao/payment.service';
import {UserService} from '../../../services/userDao/user.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  @Input() id;
  @Input() tittle;
  @Input() description;
  @Input() price;
  @Input() pizzaId;
  @Input() allCart;
  @Input() volume;
  @Input() drinkId;
  @Input() snackId;
  @Input() dessertId;
  purchase: Purchase;
  constructor(private paymentService: PaymentService,
              private userService: UserService,
              private toastrService: ToastrService,
              private activeModal: NgbActiveModal,
              public themeService: ThemeService,
              private router: Router) {
  }

  ngOnInit(): void {
    debugger;
  }

  confirm(id: string): void {
    debugger;
    if (!(this.allCart && this.allCart.length)) {
      // this.purchase = {
      //   description: this.description,
      //   name: this.tittle,
      //   pizzaId: this.pizzaId,
      //   drinkId: this.drinkId,
      //   snackId: this.snackId,
      //   dessertId: this.dessertId,
      //   price: this.price,
      //   //userId: this.themeService.data.value.userId,
      //   volume: typeof this.volume === 'string' ? +this.volume.match(/[0-9]/gi).join('') : this.volume,
      // };
      console.log(this.purchase);
      this.paymentService.confirm(id, this.purchase).subscribe(data => {
          // tslint:disable-next-line:no-shadowed-variable
          this.toastrService.success
          ('Your payment is success, thank you', 'Payment success' + data[`id`],
            {positionClass: 'toast-center-center', timeOut: 3000});
        },
        err => {
          console.log(err);
        }
      );
    } else {
      // this.paymentService.confirmAllCart(id, this.themeService.data.value.userId, this.allCart)
      //   .subscribe(data => {
      //     this.activeModal.close();
      //     // tslint:disable-next-line:no-shadowed-variable
      //     this.router.navigate(['/']).then(data => console.log(data));
      //     this.allCart.forEach(value => {
      //       this.userActionsService.deletePizzaCartInStore(value.id);
      //     });
      //     this.toastrService.success
      //     ('Your payment is success, thank you', 'Payment success' + data[`id`],
      //       {positionClass: 'toast-center-center', timeOut: 3000});
      //   });
    }
  }

  cancel(id: string): void {
    this.paymentService.cancel(id).subscribe(
      data => {
        this.toastrService.show
        ('pago cancelado', 'se ha cancelado el pago con id ' + data[`id`], {
          positionClass: 'toast-top-center',
          timeOut: 3000
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
