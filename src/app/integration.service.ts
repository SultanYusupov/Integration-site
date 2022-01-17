import { Injectable } from '@angular/core';
import {NgxMetrikaService} from "@kolkov/ngx-metrika";
@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public status: boolean = true;


  clickEvent() {
    // по клику появляется окно формы
    this.status = !this.status;
    this.ym.reachGoal.next({target: 'FORM_OPENING'});
  }
  constructor(
    private ym: NgxMetrikaService
  ) {}
}
