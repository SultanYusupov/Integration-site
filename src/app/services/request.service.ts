import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendResponse} from '../model/backend-response';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private backendUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.backendUrl = 'http://stazhirovka-2021-0611.solo-it.ru/backend/index.php';
    console.log(this.backendUrl);
    console.log('request есть');
  }

  request(method: any, params?: any): Observable<BackendResponse>{
    if (params){
      return this.http.post(this.getUrl(method), params, {withCredentials: true})
        .pipe(map(response => response as BackendResponse));
    } else {
      return this.http.get(this.getUrl(method), {withCredentials: true})
        .pipe(map(response => response as BackendResponse));
    }
  }
  private getUrl(method:any){
    return this.backendUrl;
  }
}
