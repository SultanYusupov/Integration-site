import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { IntegrationService } from "../integration.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  systems = systems;
  product = systems; // это для страницы, где будет только одна система
  prod: any;
  constructor(private integrationService: IntegrationService) { }
  addToIntegrationList(prod: any) {
    this.integrationService.addToIntegrationList(prod);
    // console.log(prod);
  }
  ngOnInit(): void {
  }

}
