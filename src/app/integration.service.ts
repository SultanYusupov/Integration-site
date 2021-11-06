import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  items: any[] = [];
  addToIntegrationList(system: any) {
    this.items.push(system);
  }
  getItems() {
    return this.items;
  }
  constructor() { }
}
