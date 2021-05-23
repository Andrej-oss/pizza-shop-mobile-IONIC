import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable, of, pipe, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Drink} from '../../../models/Drink';
import {Snack} from '../../../models/Snack';
import {Dessert} from '../../../models/Dessert';
import {UserService} from '../../../services/userDao/user.service';
import {PizzaService} from '../../../services/pizzaDao/pizza.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {ThemeService} from '../../../../theme/behaviour-subject/theme.service';
import {AvatarService} from '../../../services/avatarDao/avatar.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.page.html',
  styleUrls: ['./user-auth.page.scss'],
})
export class UserAuthPage implements OnInit, OnDestroy {
  error: string;
  hide = true;
  sub: Subscription;
  authForm: FormGroup;
  username: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  authority: string;
  blackTheme: 'card-auth-black';
  whiteTheme: 'card-auth';
  blackStyle: 'color: white';
  whiteStyle: 'color: black';
  drinks: Drink[];
  snacks: Snack[];
  desserts: Dessert[];

  constructor(private userService: UserService,
              private router: Router,
              private pizzaService: PizzaService,
              private avatarService: AvatarService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              public themeService: ThemeService) {
    this.authForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.accessDenied) {
        console.log(params);
        this.error = 'Please log in to Pizza shop first';
      }
      console.log(params);
    });
    this.formCheck();
  }
  getAuthenticateUser(user: {username: string, password: string}): any{
    return new Promise(resolve => {
      console.log(user);
      return this.userService.authenticateUser(user).subscribe(data => resolve(data));
    });
  }
  getPrincipal(name: string): any{
    return new Promise(resolve => {
      return this.userService.getUserByName(name).subscribe(data => resolve(data));
    });
  }

  onAuthenticate(authForm: FormGroup): void {
    this.authForm.disable();
    this.userService
      .authenticateUser({username: authForm.controls.username.value, password: authForm.controls.password.value})
      .pipe(switchMap(data1 => {
           this.userService.getUserByName(data1.username);
           return this.userService.getUserByName(data1.username);
        }),
        tap(data2 => this.cartService.getAllCartsElements(data2.id)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data2 => this.themeService.data.value.cartElements = data2.length)))
          .subscribe((data) => {
          this.error = null;
          this.router.navigate(['/']);
          this.themeService.data.value.userId = data.id;
          this.themeService.data.value.userName = data.username;
          this.themeService.data.value.principle = data;
          this.avatarService.getAvatar(data.id)
            .subscribe(avatar => this.themeService.data.value.avatar = avatar);
        },
        (error) => {
          if (error.status === 403) {
            this.error = 'Wrong User name or password!!!!!!!!!!';
          }
          console.warn(error);
          this.authForm.enable();
        });
  }

  isAdmin(): boolean {
    return this.authority === 'ADMIN' ? true : false;
  }

  formCheck(): void {
    if (this.userService.isAuthenticated()) {
      this.authForm.disable();
    } else if (!this.userService.isAuthenticated()) {
      this.authForm.enable();
    }
  }

  onRegistration(): void {
    this.router.navigateByUrl('/registration');
  }

  onReminder(): void{
    this.router.navigate(['user-password-reminder']);
  }
}
