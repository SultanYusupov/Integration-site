import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  items: any[] = []; // сюда будут добавляться системы, которые выбрали
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
  }
  constructor() { }
}
