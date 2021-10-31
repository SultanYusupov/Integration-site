import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { systems } from '../systems';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.css']
})
export class IntegrationPageComponent implements OnInit {
  system: any;
  items: any;

  constructor(private route: ActivatedRoute, private integrationService: IntegrationService) {
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
      this.system = systems[+params['systemId']];
      // this.system = systems[this.systemId];
    })
  }
}
