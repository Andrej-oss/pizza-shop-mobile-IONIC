import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../../models/Purchase';
import {PurchasePage} from '../../models/PurchasePage';
import {APiURL} from '../../config/configURL';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = APiURL.purchaseURL;

  constructor(private httpClient: HttpClient) { }
  getPurchasesByUser(userId: number): Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(this.baseUrl + `${userId}`);
  }
  deletePurchase(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `${id}`);
  }
  getAllPurchases(page: number = 0, sort: string = 'amount', type: string = 'desc'): Observable<PurchasePage>{
    return this.httpClient.get<PurchasePage>(this.baseUrl + `?page=${page}&sort=${sort}&type=${type}`);
  }
}
