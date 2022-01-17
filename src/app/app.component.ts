import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {NgxMetrikaService} from "@kolkov/ngx-metrika";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Интеграции Solo-it';
  constructor(
    private metaTagService: Meta,
    private ym: NgxMetrikaService
  ) {
    this.ym.hit.emit();
    this.ym.reachGoal.next({target: 'TARGET_NAME'});
  }

  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Сервис интеграций, конструктор интеграций по api, интеграция по api' },
      { name: 'robots', content: 'all' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
