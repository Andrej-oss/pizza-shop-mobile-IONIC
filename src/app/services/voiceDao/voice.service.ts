import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Voice} from '../../models/Voice';
import {APiURL} from '../../config/configURL';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private baseURL = APiURL.voiceURL;

  constructor(private httpClient: HttpClient) { }
  saveVoice(id: number, voice: Voice): Observable<Voice[]>{
    return this.httpClient.post<Voice[]>(this.baseURL + `${id}`, voice);
  }
  deleteVoiceComment(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseURL + `${id}`);
  }
}
