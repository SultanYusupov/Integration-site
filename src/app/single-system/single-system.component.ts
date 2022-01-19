import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { IntegrationService } from '../integration.service';
import {NgxMetrikaService} from "@kolkov/ngx-metrika";

@Component({
  selector: 'app-single-system',
  templateUrl: './single-system.component.html',
  styleUrls: ['./single-system.component.css']
})
export class SingleSystemComponent implements OnInit {
  title: any; // мета тег <title>
  systems = systems; // для routerLink in <li>
  product1: any; // объект из массива systems.ts. система, которую мы выбрали
  numberId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private metaTagService: Meta,
              public integrationService: IntegrationService,
              private ym: NgxMetrikaService) {
    this.route.paramMap.subscribe((params) => {
      // в params находится имя системы, взятое из url-адреса, и с помощью метода findIndex находим id объекта (из systems.ts)
      this.numberId = systems.findIndex((el) => {
        return el.url == params.get('id1');
      });
      // по номеру id находим сам объект. эта переменная будет использоваться в html-коде
      this.product1 = this.systems[this.numberId];
    });

    //this.ym.hit.emit({url: `/products/${this.product1}`, hitOptions: options});
    this.ym.hit.emit({url: `/products/${this.product1}`, hitOptions: {
        title: `${this.product1}`,
        referer: 'http://stazhirovka-2021-0611.solo-it.ru'
    }});
  }

  ngOnInit(): void {
    this.title = `${this.product1.name} интеграция`;
    this.titleService.setTitle(this.title); // устанавливаем meta тег <title>
    // прочие мета теги
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: `Нужно объединить ${this.product1.name} с другими системами? Мы поможем вам интегрировать и автоматизировать бизнес процессы`
      },
    );
    this.metaTagService.updateTag(
      {
        name: 'keywords',
        content: `${this.product1.name}, ${this.product1.name} интеграция, ${this.product1.name} автоматизация`
      }
    );
  }
}
