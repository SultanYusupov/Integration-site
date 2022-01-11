import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendResponse} from '../model/backend-response';
import {map} from 'rxjs/operators';
import { environment } from "../../environments/environment.prod";

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
  }

  request(params?: any): Observable<BackendResponse>{
    if (params){
      return this.http.post(this.backendUrl, params, {withCredentials: true})
        .pipe(map(response => response as BackendResponse));
    } else {
      return this.http.get(this.backendUrl, {withCredentials: true})
        .pipe(map(response => response as BackendResponse));
    }
  }

}
