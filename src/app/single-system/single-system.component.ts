import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-single-system',
  templateUrl: './single-system.component.html',
  styleUrls: ['./single-system.component.css']
})
export class SingleSystemComponent implements OnInit {
  title: any; // мета тег <title>
  systems = systems; // for routerLink in <li> of AgileComponent. It was originally
  // system: any; // for parameters below. for TurboComponent
  product1: any; // объект из массива systems.ts. система, которую мы выбрали
  numberId: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private metaTagService: Meta,
              ) {
    this.route.paramMap.subscribe((params) => {
      // в params находится имя системы, взятое из url-адреса, и с помощью метода findIndex находим id объекта (из systems.ts)
      this.numberId = systems.findIndex((el) => {
        return el.url == params.get('id1');
      });

      this.product1 = this.systems[this.numberId];

    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title); // устанавливаем meta тег <title>
    // прочие мета теги
    this.metaTagService.updateTag(
      { name: 'description', content: `Нужно объединить ${this.product1.name} с другими системами? Наш сайт позволяет самостоятельно интегрировать и автоматизировать бизнес процессы` },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: `${this.product1.name}, ${this.product1.name} интеграция, ${this.product1.name} автоматизация` }
    );
  }
}
