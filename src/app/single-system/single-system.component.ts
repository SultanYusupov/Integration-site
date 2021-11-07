import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from '../integration.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-single-system',
  templateUrl: './single-system.component.html',
  styleUrls: ['./single-system.component.css']
})
export class SingleSystemComponent implements OnInit {
  title = `Agile CRM | Интеграция, Автоматизация за 5 минут`;
  systems = systems; // for routerLink in <li> of AgileComponent. It was originally
  system: any; // for parameters below. for TurboComponent
  product: any; // for AgileComponent
  idNumber: any;
  constructor(private route: ActivatedRoute,
              private integrationService: IntegrationService,
              private titleService: Title,
              private metaTagService: Meta) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // в значение params записывается то, что мы писали в routerLink="/product/{{system.title}}" из main-page.component.html
      this.idNumber = systems.findIndex((el, val)=>{
        return el.title == params['id'];
      });
      this.system = this.idNumber; // идёт из routerLink main-page.component. Сюда записывается номер id
      this.product = systems[this.system]; // идёт из params выше. Сюда записывается выбранный объект из массива systems
      // this.system = +params['id'];
      // this.product = systems[this.system];
    })
    // this.route.params.subscribe((params)=>{
    //   this.product = +params.get('id')
    // })
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Нужно объединить  с другими системами? Наш сайт позволяет самостоятельно интегрировать и автоматизировать бизнес процессы' },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: `${this.product.name}, ${this.product.name} интеграция, ${this.product.name} автоматизация` }
    );
  }
// addToIntegrationList(product) {
  //   this.integrationService.addToIntegrationList(product);
  // }
}
