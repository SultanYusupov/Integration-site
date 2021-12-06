import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
// import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  myFirstReactiveForm: any;
  // subscription: SubscriptionLike;

  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {

  }


  /*status: boolean = false;
  clickEvent() {
    // this.integrationService.clickEvent();
    this.status = !this.status;
  }*/

  /* onSubmit(customerData: any) {
    this.integrationService.onSubmit(customerData);
  }*/

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    return this.myFirstReactiveForm = this.formBuilder.group({
      name: [''],
      email: [''],
      telephone: []
    });
  }

  onSubmit(customerData: any) {
    console.warn('Your order has been submitted', customerData);
    this.myFirstReactiveForm.reset();
  }

  sendData() {
    let url = 'http://localhost/index.php';
    return this.http.post(url, this.myFirstReactiveForm.value);
  /*.subscribe(
      data => this.myFirstReactiveForm.value = data,
      err => console.log('ERROR!!!'),
      () => window.alert('Got response from API')
    )*/
  }

}
