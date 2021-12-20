import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public status: boolean = true;

  clickEvent() {
    this.status = !this.status;
  }
  constructor() {}
}
