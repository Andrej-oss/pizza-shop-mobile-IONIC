import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../../userDao/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserPageGuardGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['user-auth'], {
        queryParams: {
          accessDenied: true
        }
      }).then(data => console.log(data));
    }
    return of(false);
  }
}
