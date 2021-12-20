import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  systems = systems;
  constructor() { }
  ngOnInit(): void {
  }

}
