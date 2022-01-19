import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { systems } from '../systems';
import { IntegrationService } from '../integration.service';
import { Title, Meta } from '@angular/platform-browser';
import {NgxMetrikaService} from "@kolkov/ngx-metrika";

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.css']
})
export class IntegrationPageComponent implements OnInit {
  metaTitle: any; // для мета тегов <title>
  system: any;
  systems = systems; // массив объектов из systems.ts
  system1: any; // для первой системы
  system2: any; // для второй системы
  product1: any;
  product2: any;
  numberId1: any;
  numberId2: any;

  constructor(private route: ActivatedRoute,
              public integrationService: IntegrationService,
              private titleService: Title,
              private metaTagService: Meta,
              private router: Router,
              private ym: NgxMetrikaService) {

    this.route.paramMap.subscribe((params) => {
      // имя первой системы из url
      this.product1 = params.get('id1');
      // находим номер id объекта (из systems.ts)
      this.numberId1 = systems.findIndex((el) => {
        return el.url == params.get('id1');
      });
      // по номеру id находим первый объект. эта переменная будет использоваться в html-коде
      this.system1 = systems[this.numberId1];

      // имя второй системы из url
      this.product2 = params.get('id2');
      // находим номер id объекта (из systems.ts)
      this.numberId2 = systems.findIndex((el) => {
        return el.url == params.get('id2');
      });
      // по номеру id находим второй объект. эта переменная будет использоваться в html-коде
      this.system2 = systems[this.numberId2];

      // динамические мета теги
      this.metaTitle = `${this.system1.name} + ${this.system2.name} интеграция`;
      this.titleService.setTitle(this.metaTitle);
      this.metaTagService.updateTag(
        { name: 'description', content: `Нужно объединить ${this.system1.name} и ${this.system2.name}? Мы поможем вам интегрировать и автоматизировать бизнес процессы.` },
      );
      this.metaTagService.updateTag(
        { name: 'keywords', content: `${this.system1.name} ${this.system2.name}, ${this.system1.name} ${this.system2.name} интеграция, ${this.system1.name} ${this.system2.name} автоматизация` }
      );
    });

    this.ym.hit.emit();
  }
  scroll() {
    window.scrollTo(0, 0);
  }
  onSectionClick(product1: any, product2: any) {
    this.router.navigate(['/path/', product1, product2], {
      relativeTo: this.route,
    });
  }
  changeSystem() {
    this.router.navigateByUrl(this.system.url);
  }

  ngOnInit(): void {}
}
