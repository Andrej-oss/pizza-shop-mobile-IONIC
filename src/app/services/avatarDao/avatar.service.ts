import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Avatar} from '../../models/Avatar';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private baseUrl = 'http://localhost:8080/avatar';
  constructor(private httpClient: HttpClient) { }
  saveAvatar(userId: number, formData: FormData, append: void): Observable<Avatar>{
    return this.httpClient.post<Avatar>(this.baseUrl + `/${userId}`, formData, );
  }
  updateAvatar(id: number, formData: FormData): Observable<Avatar>{
    return this.httpClient.put<Avatar>(this.baseUrl + `/${id}`, formData);
  }
  deleteAvatar(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `/${id}`);
  }
  getAvatar(userId: number): Observable<Avatar>{
   return  this.httpClient.get<Avatar>(this.baseUrl + `/${userId}`);
  }
  getAllAvatars(): Observable<Avatar[]>{
    return this.httpClient.get<Avatar[]>(this.baseUrl);
  }
}
