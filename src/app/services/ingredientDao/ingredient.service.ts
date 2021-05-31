import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';
import {APiURL} from '../../config/configURL';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = APiURL.ingredientURL;

  constructor(private httpClient: HttpClient) { }

  saveIngredient(formData: FormData, append: void): Observable<Ingredient[]>{
    return this.httpClient.post<Ingredient[]>(this.baseUrl, formData);
  }
  getAllIngredients(): Observable<Ingredient[]>{
    return this.httpClient.get<Ingredient[]>(this.baseUrl);
  }
  upDateIngredient(id: number, formData: FormData, append: void): Observable<Ingredient[]>{
    return this.httpClient.put<Ingredient[]>(this.baseUrl + `/${id}`, formData);
  }
  deleteIngredient(id: number): Observable<Ingredient[]>{
    return this.httpClient.delete<Ingredient[]>(this.baseUrl + `/${id}`);
  }
}
