import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { systems } from '../systems';
import { IntegrationService } from '../integration.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.css']
})
export class IntegrationPageComponent implements OnInit {
  title: any;
  system: any;
  items: any;
  number: any;

  constructor(private route: ActivatedRoute,
              private integrationService: IntegrationService,
              private titleService: Title,
              private metaTagService: Meta) {
    this.items = integrationService.getItems();
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params)=>{
    //   this.system = systems[+(params.get('systemId'))];
    // })
    // this.route.queryParams.subscribe(params => {
    //   this.system = params['systemId'];
    // })
    this.route.params.subscribe(params => {
      this.number = systems.findIndex((el)=>{
        return el.title == params['systemId'];
      });
      this.system = systems[this.number];
      // this.system = systems[+params['systemId']];
    });

    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Нужно объединить Клиентикс и TurboSMS? ApiX-Drive позволяет самостоятельно интегрировать и автоматизировать работу систем.' },
    );
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'Клиентикс TurboSMS, Клиентикс TurboSMS интеграция, Клиентикс TurboSMS автоматизация' }
    );
  }
}
