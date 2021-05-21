import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../../models/Promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private baseUrl = 'http://localhost:8080/promotion';

  constructor(private httpClient: HttpClient) { }
  savePromotion(promotion: FormData, append: void): Observable<Promotion[]>{
    return this.httpClient.post<Promotion[]>(this.baseUrl, promotion);
  }
  getAllPromotions(): Observable<Promotion[]>{
    return this.httpClient.get<Promotion[]>(this.baseUrl);
  }
  deletePromotion(id: number): Observable<Promotion[]>{
    return this.httpClient.delete<Promotion[]>(this.baseUrl + `/${id}`);
  }
  updatePromotion(id: number, promotion: FormData, append: void): Observable<Promotion[]>{
   return this.httpClient.put<Promotion[]>(this.baseUrl + `/${id}`, promotion);
  }
}
