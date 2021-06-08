import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthUser} from '../../models/AuthUser';
import {ThemeService} from '../../../theme/behaviour-subject/theme.service';
import {APiURL} from '../../config/configURL';
import {Cart} from '../../models/Cart';
import {ToasterServiceService} from '../toaster/toaster-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token = null;
  private authority = null;
  private userName = null;
  private baseUrl = APiURL.userURL;
  private localStorageCart = APiURL.localStorageKey;

  constructor(private httpClient: HttpClient,
              private themeService: ThemeService,
              private toaster: ToasterServiceService,
              private router: Router) {
  }

  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/authenticate/' + name);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  saveUser(user: User): Observable<User[]> {
    return this.httpClient.post<User[]>(this.baseUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    console.log(id);
    return this.httpClient.put<User>(this.baseUrl + `/${id}`, user);
  }

  passwordReminder(email: string): Observable<string> {
    return this.httpClient.get<string>(this.baseUrl + `/remind/${email}`);
  }

  authenticateUser(authUser: AuthUser): Observable<{ token: string, role: string, username: string }> {
    return this.httpClient
      .post<{ token: string, role: string, username: string }>(this.baseUrl + '/authenticate', authUser)
      .pipe(
        tap(({token, role, username}) => {
            // this.themeObjectService.data.value.isAuthLoad = false;
            localStorage.setItem('token', token);
            this.setToken(token);
            if (role.startsWith('[ROLE_') && role.endsWith(']')) {
              const rol = role.split('');
              rol.splice(0, 6);
              rol.splice(-1, 1);
              const s = rol.join('');
              this.setAuthority(s);
              console.log(this.authority);
            }
            this.userName = username;
          }
        ));
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logOut(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.authority = null;
    this.themeService.data.value.userId = 0;
    this.themeService.data.value.cartElements = 0;
    this.themeService.data.value.userName = '';
    this.themeService.data.value.avatar = null;
    this.router.navigate(['/']).then(data => console.log(data));
  }

  setAuthority(role: string): void {
    this.authority = role;
  }

  getAuthority(): string {
    return this.authority;
  }

  isAdmin(): boolean {
    return this.authority === 'ADMIN';
  }

  isUser(): boolean {
    return this.authority === 'USER';
  }

  getUserName(): string {
    return this.userName;
  }

  deleteUser(id: number): Observable<User[]> {
    return this.httpClient.delete<User[]>(this.baseUrl + `/${id}`);
  }

  saveCartInLocalStorage(cart: Cart): void {
    if (cart.pizzaId || cart.dessertId || cart.drinkId || cart.snackId) {
      if (localStorage.getItem(`${this.localStorageCart}_${cart.description}`)) {
        const itemLS = localStorage.getItem(`${this.localStorageCart}_${cart.description}`);
        const parsePizzaLS = JSON.parse(itemLS);
        cart.amount = parsePizzaLS.amount + 1;
        cart.price = parsePizzaLS.price + cart.price;
        localStorage.setItem(`${this.localStorageCart}_${cart.description}`, JSON.stringify(cart));
      }
      localStorage.setItem(`${this.localStorageCart}_${cart.description}`, JSON.stringify(cart));
      this.toaster.presentToast();
      this.themeService.data.value.cartElements++;
    }
  }
}
