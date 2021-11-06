import { Component, OnInit } from '@angular/core';
import { systems } from '../systems';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-single-system',
  templateUrl: './single-system.component.html',
  styleUrls: ['./single-system.component.css']
})
export class SingleSystemComponent implements OnInit {
  systems = systems; // for routerLink in <li> of AgileComponent. It was originally
  system: any; // for parameters below. for TurboComponent
  product: any; // for AgileComponent
  constructor(private route: ActivatedRoute, private integrationService: IntegrationService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   this.system = systems[+params.get('systemId')];
    // });

    // this.route.paramMap.subscribe((params) => {
    //   this.product = systems[+params.get('id')];
    // });

    // здесь заменил queryParams на params
    this.route.params.subscribe(params => {
      this.system = +params['id'];
      console.log('params = '+ params['id']); // идёт из routerLink main-page.component. Сюда записывается номер id
      this.product = systems[this.system];
      console.log('this.product = '+this.product); // идёт из params выше. Сюда записывается выбранный объект из массива systems
    })
    // this.route.params.subscribe((params)=>{
    //   this.product = +params.get('id')
    // })
  }
// addToIntegrationList(product) {
  //   this.integrationService.addToIntegrationList(product);
  // }
}
