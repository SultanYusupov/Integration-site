import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  systems = systems;
  product = systems; // это для страницы, где будет только одна система. не используется, в конечном варианте удалить
  // prod: any;
  constructor() { }
  ngOnInit(): void {
  }

}
