import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
 /* items: any[] = []; // сюда будут добавляться системы, которые выбрали
  addToIntegrationList(system: any) {
    this.items.push(system);
  }
  getItems() {
    console.log(this.items);
    return this.items;
  }
  changeFirstSystem(s: any) {
    this.items.shift();
    this.items.unshift(s);
  }
  changeSecondSystem(s: any) {
    this.items.pop();
    this.items.push(s);
  } */

  public status: boolean = true;
  public clickEvent() {
    this.status = !this.status;
  }

  postData(user: any) {
    const body = { name: user.name, age: user.age }
    return this.http.post(
      'http://localhost:60820/api/values',
      body
    )
  }
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {

  }

}
