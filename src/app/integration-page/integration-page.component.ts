import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { systems } from '../systems';
import { IntegrationService } from '../integration.service';
import { Title, Meta } from '@angular/platform-browser';
import {Location} from "@angular/common";

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.css']
})
export class IntegrationPageComponent implements OnInit {
  metaTitle: any; // для мета тегов <title>
  system: any;
  commonArray: any; // общий массив, в котором хранятся первая и вторя системы
  // number: any;
  systems = systems; // массив объектов из systems.ts
  system1: any; // для первой системы
  system2: any; // для второй системы
  product1: any;
  product2: any;
  numberId1: any;
  numberId2: any;

  constructor(private route: ActivatedRoute,
              private integrationService: IntegrationService,
              private titleService: Title,
              private metaTagService: Meta,
              private router: Router,
              private location: Location) {
    // при роутинге из компонента single-page
    /* this.commonArray = integrationService.getItems();
    this.system1 = this.commonArray[0];
    this.system2 = this.commonArray[1]; */

    this.route.paramMap.subscribe((params) => {
      this.product1 = params.get('id1');
      this.numberId1 = systems.findIndex((el) => {
        return el.url == params.get('id1');
      });
      this.system1 = systems[this.numberId1];

      this.product2 = params.get('id2');
      this.numberId2 = systems.findIndex((el) => {
        return el.url == params.get('id2');
      });
      this.system2 = systems[this.numberId2];

      // динамические мета теги
      this.metaTitle = `${this.system1.name} + ${this.system2.name} интеграция`;
      this.titleService.setTitle(this.metaTitle);
      this.metaTagService.updateTag(
        { name: 'description', content: `Нужно объединить ${this.system1.name} и ${this.system2.name}? Наш сайт позволяет самостоятельно интегрировать и автоматизировать работу систем.` },
      );
      this.metaTagService.updateTag(
        { name: 'keywords', content: `${this.system1.name} ${this.system2.name}, ${this.system1.name} ${this.system2.name} интеграция, ${this.system1.name} ${this.system2.name} автоматизация` }
      );
    });
  }

  onSectionClick(product1: any, product2: any) {
    this.router.navigate(['/path/', product1, product2], {
      relativeTo: this.route,
    });
  }
  changeSystem() {
    this.router.navigateByUrl(this.system.url);
  }

  /* в этих функциях дублируются переменные и другие функции, потому что они предназначены для другого роутинга,
   который находится внутри компонента integration-page (строки 127 и 139) */
  /* changeFirstSystem(s: any) {
    this.integrationService.changeFirstSystem(s);
    this.system1 = this.integrationService.getItems()[0];
    // здесь мета теги обновляются когда выбираем другую систему слева. обновляется только system1
    this.metaTitle = `${this.system1.name} + ${this.system2.name} интеграция`;
    this.titleService.setTitle(this.metaTitle);
    this.metaTagService.updateTag(
      { name: 'description', content: `Нужно объединить ${this.system1.name} и ${this.system2.name}? Наш сайт позволяет самостоятельно интегрировать и автоматизировать работу систем.` },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: `${this.system1.name} ${this.system2.name}, ${this.system1.name} ${this.system2.name} интеграция, ${this.system1.name} ${this.system2.name} автоматизация` }
    );
  }/*

  changeSecondSystem(i: any) {
    this.integrationService.changeSecondSystem(i);
    this.system2 = this.integrationService.getItems()[1];

    /* здесь мета теги обновляются когда выбираем другую систему справа. обновляется только system2.
    * код дублируется, чтобы system2 обновлялся независимо от system1 */
    /*this.metaTitle = `${this.system1.name} + ${this.system2.name} интеграция`;
    this.titleService.setTitle(this.metaTitle);
    this.metaTagService.updateTag(
      { name: 'description', content: `Нужно объединить ${this.system1.name} и ${this.system2.name}? Наш сайт позволяет самостоятельно интегрировать и автоматизировать работу систем.` },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: `${this.system1.name} ${this.system2.name}, ${this.system1.name} ${this.system2.name} интеграция, ${this.system1.name} ${this.system2.name} автоматизация` }
    );
  } */
/*------------------------------------------------------------------------------------------*/
  ngOnInit(): void {
    /* this.route.paramMap.subscribe((params)=>{
      this.system = systems[+(params.get('systemId'))];
    })
    this.route.queryParams.subscribe(params => {
      this.system = params['systemId'];
    }) */
    /* this.route.params.subscribe(params => {
      this.number = systems.findIndex((el)=>{
        return el.url == params['systemId'];
      });
      this.system = systems[this.number]; // объект, который выбрали
      // this.system = systems[+params['systemId']];
    }); */

    /* this.router.navigateByUrl(this.system.title); // для внутреннего роутинга, который находится в integration-page.html (строки 127 и 139).
    эта функция записывает имя выбранной системы в url адрес */

  }

}
