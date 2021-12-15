import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = 'http://localhost/index.php';
  private obj = '{"name" : "name"}';

  constructor(
    private http: HttpClient,
    // private token: string
  ) { }

  get<T>(module: any, method: any){
    // console.log(`${this.backendUrl}/${module}/${method}`)
    return this.http.post<any>(this.backendUrl, {
      token: 'token'
    }, {withCredentials: true})
      .pipe(map((response: {
        code: any,
        data: any
      }) => {
        return response.data as T
      }))
  }

  /*
  post<T>(module, method, params){
    console.log(`${this.backendUrl}/${module}/${method}`)
    return this.http.post(`${this.backendUrl}/${module}/${method}`, Object.assign({
      token: this.token
    }, params), {withCredentials: true})
      .pipe(map((response: {
        code: any,
        data: any
      }) => {
        return response.data as T
      }))
  }
   */

  post<T>(module: any, method: any, params: any){
    //console.log(`${this.backendUrl}/${module}/${method}`)
    return this.http.post<any>(this.backendUrl, Object.assign({
      token: 'token'
    }, params), {withCredentials: true})
      .pipe(map((response: {
        code: any,
        data: any
      }) => {
        return response.code as T
      }))
  }

  // setToken(token: string) {
  //   this.token = token
  // }
}
