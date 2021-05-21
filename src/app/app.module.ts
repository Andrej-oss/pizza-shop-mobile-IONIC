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

@NgModule({
  declarations: [AppComponent, UserAvatarPipe],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51Hv6uTGmmCaqYLZpH2DedxpEXPGQFNx7eM4i' +
      'aTxkjowLq94xpVY5ORolZnmokcoiwQ51IAMCWsGC0B6cl6c7EbUg00Aefbn2rC'),
    NgbModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
