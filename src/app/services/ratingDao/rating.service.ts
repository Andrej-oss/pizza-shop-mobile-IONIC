import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rating} from '../../models/Rating';
import {APiURL} from '../../config/configURL';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = APiURL.ratingURL;

  constructor(private httpClient: HttpClient) { }
  saveRating(pizzaId: number, rating: Rating): Observable<Rating[]>{
    return this.httpClient.post<Rating[]>(this.baseUrl + `${pizzaId}`, rating);
  }
}
