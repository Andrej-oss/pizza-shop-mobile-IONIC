import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {UserPageGuardGuard} from './components/guards/user-page-guard/user-page-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'pizza',
    loadChildren: () => import('./pages/pizza/pizza-page/pizza.module').then(m => m.PizzaPageModule)
  },
  {
    path: 'drinks',
    loadChildren: () => import('./pages/drinks/drinks.module').then( m => m.DrinksPageModule)
  },
  {
    path: 'snack',
    loadChildren: () => import('./pages/snack/snack.module').then( m => m.SnackPageModule)
  },
  {
    path: 'dessert',
    loadChildren: () => import('./pages/dessert/dessert-page/dessert.module').then(m => m.DessertPageModule)
  },
  {
    path: 'pizza/:id',
    loadChildren: () => import('./pages/pizza/pizza-detail/pizza-detail.module').then( m => m.PizzaDetailPageModule)
  },
  {
    path: 'user-auth',
    loadChildren: () => import('./pages/user/user-auth/user-auth.module').then( m => m.UserAuthPageModule)
  },
  {
    path: 'user-registration',
    loadChildren: () => import('./pages/user/user-registration/user-registration.module').then( m => m.UserRegistrationPageModule)
  },
  {
    path: 'user-password-reminder',
    loadChildren: () => import('./pages/user/user-password-reminder/user-password-reminder.module').
    then( m => m.UserPasswordReminderPageModule)
  },
  {
    path: 'cart-page',
    loadChildren: () => import('./pages/cart/cart-page/cart-page.module').then( m => m.CartPagePageModule)
  },
  {
    path: 'user-page',
    loadChildren: () => import('./pages/user/user-page/user-page.module').then( m => m.UserPagePageModule), canActivate: [UserPageGuardGuard]
  },
  {
    path: 'dessert-edtail',
    loadChildren: () => import('./pages/dessert/dessert-edtail/dessert-edtail.module').then( m => m.DessertEdtailPageModule)
  },
  {
    path: 'dessert-detail',
    loadChildren: () => import('./pages/dessert/dessert-detail/dessert-detail.module').then( m => m.DessertDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
