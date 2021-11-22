import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationService } from '../integration.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single-system',
  templateUrl: './single-system.component.html',
  styleUrls: ['./single-system.component.css']
})
export class SingleSystemComponent implements OnInit {
  title: any; // мета тег <title>
  systems = systems; // for routerLink in <li> of AgileComponent. It was originally
  system: any; // for parameters below. for TurboComponent
  product1: any; // for AgileComponent
  numberId: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public integrationService: IntegrationService,
              private titleService: Title,
              private metaTagService: Meta,
              ) {
    this.route.paramMap.subscribe((params) => {
      // this.product = params.get('id1');
      this.numberId = systems.findIndex((el) => {
        return el.url == params.get('id1');
      });

      this.product1 = this.systems[this.numberId];
    });
  }

  ngOnInit(): void {
    /* this.route.params.subscribe(params => {
      // в значение params записывается то, что мы писали в routerLink="/product/{{system.title}}" из main-page.component.html
      this.idNumber = systems.findIndex((el, val)=>{
        return el.title == params['id']; // по свойству title ищем индекс элемента
      });
      this.system = this.idNumber; // идёт из routerLink main-page.component. Сюда записывается номер id
      this.product = systems[this.system]; // идёт из params выше. Сюда записывается выбранный объект из массива systems
      this.title = `${this.product.name} интеграция, Автоматизация за 5 минут`; // мета тег <title>
      // this.system = +params['id'];
      // this.product = systems[this.system];
    }) */


    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: `Нужно объединить ${this.product1.name} с другими системами? Наш сайт позволяет самостоятельно интегрировать и автоматизировать бизнес процессы` },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: `${this.product1.name}, ${this.product1.name} интеграция, ${this.product1.name} автоматизация` }
    );
  }

  /* addToEndList(i: any) {
    this.integrationService.addToIntegrationList(i);
  }*/
}
