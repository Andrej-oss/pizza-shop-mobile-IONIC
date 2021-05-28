import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxStripeModule} from 'ngx-stripe';
import {ToastrModule} from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAvatarPipe } from './pipes/user-avatar.pipe';
import {UserAuthPage} from './pages/user/user-auth/user-auth.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaymentComponent} from './components/payment-stripe/payment/payment.component';

@NgModule({
  declarations: [AppComponent, UserAvatarPipe, UserAuthPage],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxStripeModule.forRoot('pk_test_51Hv6uTGmmCaqYLZpH2DedxpEXPGQFNx7eM4i' +
      'aTxkjowLq94xpVY5ORolZnmokcoiwQ51IAMCWsGC0B6cl6c7EbUg00Aefbn2rC'),
    NgbModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbModule, ReactiveFormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
