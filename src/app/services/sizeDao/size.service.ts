import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Size} from '../../models/Size';
import {SizePizza} from '../../models/SizePizza';
import {APiURL} from '../../config/configURL';


@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private baseUrl = APiURL.sizeURL;

  constructor(private httpClient: HttpClient) { }

  getPizzaSize(id: number, name: string): Observable<Size>{
    return this.httpClient.get<Size>(this.baseUrl + `/${id}/${name}`);
  }
  saveSizePizza(formData: FormData, id: number, value: any): Observable<SizePizza[]>{
    return this.httpClient.post<SizePizza[]>(this.baseUrl + `/${id}`, formData);
  }
  getPizzaSizes(id: number): Observable<Size[]>{
    return this.httpClient.get<Size[]>(this.baseUrl + `/${id}`);
  }
  updatePizzaSize(id: number, formData: FormData, value: any): Observable<Size[]>{
    return this.httpClient.put<Size[]>(this.baseUrl + `/${id}`, formData);
  }
  deletePizzaSize(id: number): Observable<Size[]>{
    return this.httpClient.delete<Size[]>(this.baseUrl + `/${id}`);
  }
}
