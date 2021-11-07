import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'integration-site';
  constructor(
    private metaTagService: Meta
  ) { }

  ngOnInit() {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Сервис интеграций, конструктор интеграций по api, интеграция по api' },
      { name: 'robots', content: 'all' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
