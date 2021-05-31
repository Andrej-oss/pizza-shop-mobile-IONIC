import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dessert} from '../../models/Dessert';
import {APiURL} from '../../config/configURL';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  private baseUrl = APiURL.dessertURL;

  constructor(private httpClient: HttpClient) { }
  saveDessert(formData: FormData, append: void): Observable<Dessert[]>{
    return this.httpClient.post<Dessert[]>(this.baseUrl, formData);
  }
  getAllDessert(): Observable<Dessert[]>{
    return this.httpClient.get<Dessert[]>(this.baseUrl);
  }
  updateDessert(id: number, formData: FormData, append: void): Observable<Dessert[]>{
    return this.httpClient.put<Dessert[]>(this.baseUrl + `/${id}`, formData);
  }
  deleteDessert(id: number): Observable<Dessert[]>{
    return this.httpClient.delete<Dessert[]>(this.baseUrl + `/${id}`);
  }
  getDessert(id): Observable<Dessert>{
    return this.httpClient.get<Dessert>(this.baseUrl + `/${id}`);
  }
}
