import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rating} from '../../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  saveRating(rating: Rating, pizzaId: number): Observable<Rating[]>{
    return this.httpClient.post<Rating[]>(this.baseUrl + `/rating/${pizzaId}`, rating);
  }
}
