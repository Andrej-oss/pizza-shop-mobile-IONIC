import {Component, Input, OnInit} from '@angular/core';
import {PaymentService} from '../../../services/paymentDao/payment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StripeService} from 'ngx-stripe';
import {StripeCardElement, StripeElements, StripeElementsOptions} from '@stripe/stripe-js';
import {Payment} from '../../../models/Payment';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() price;
  @Input() description;
  @Input() tittle;
  @Input() pizzaId;
  @Input() allCart;
  @Input() drinkId;
  @Input() snackId;
  @Input() dessertId;
  @Input() volume;
  error: any;
  elements: StripeElements;
  card: StripeCardElement;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(private paymentService: PaymentService,
              public modalService: NgbModal,
              private stripeService: StripeService,
              private router: Router) { }
  public StripeControl = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        console.log(this.elements);
        if (!this.card) {
          // @ts-ignore
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
        }
        this.card.mount('#card-element');
      });
  }
  buy(): void{
    const name = this.StripeControl.get('name').value;
    this.stripeService.createToken(this.card, {name})
      .subscribe(data => {
        debugger;
        if (data.token) {
          const payment: Payment = {
            token: data.token.id,
            amount: this.price * 10,
            currency: 'eur',
            description: this.description
          };
          this.paymentService.buy(payment)
            .subscribe(data1 => {
              console.log(data1);
              this.openModal(data1[`id`], this.tittle, data1[`description`], data1[`amount`]);
            });
          this.error = undefined;
        } else if (data.error) {
          this.error = data.error.message;
        }
      });
  }
  openModal(id: string, tittle: string, description: string, price: number): void{
    debugger;
    const modalRef = this.modalService.open(PaymentModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.tittle = tittle;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.price = price / 100;
    modalRef.componentInstance.pizzaId = this.pizzaId;
    modalRef.componentInstance.drinkId = this.drinkId;
    modalRef.componentInstance.snackId = this.snackId;
    modalRef.componentInstance.dessertId = this.dessertId;
    modalRef.componentInstance.allCart = this.allCart;
    modalRef.componentInstance.volume = this.volume;
  }
}
