import { Injectable } from '@angular/core';
import {NgxMetrikaService} from "@kolkov/ngx-metrika";
@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public status: boolean = true;
  public place:number = 0;

  clickEvent() {
    // по клику появляется окно формы
    this.status = !this.status;
    this.place = document.documentElement.scrollTop + 120;
  }
  constructor(
    private ym: NgxMetrikaService
  ) {}
}
