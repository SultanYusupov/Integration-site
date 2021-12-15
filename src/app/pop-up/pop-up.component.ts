import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";
import {map} from "rxjs/operators";

import {BackendService} from "../services/backend.service";
import {iSettings, SettingsService} from "../services/settings.service";
import {SzgmDataService} from "../services/szgm-data.service";
import {ApplicationService} from "../services/application.service";
import {KpGeneratorService} from "../services/kp-generator.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  private url = 'http://localhost/index.php';
  // private token: string;
  private obj = '{"name" : "name"}';
  private code: any;
  private moduleId = "szgm";
  reactiveForm: any;

  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: BackendService,
              private settings: SettingsService,
              private sds: SzgmDataService,
              private as: ApplicationService,
              private kp: KpGeneratorService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    return this.reactiveForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/[А-я]/)
      ]
      ],
      email: ['', [
        Validators.required, Validators.email
      ]
      ],
      telephone: ['', [
        Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')
      ]
      ]
    });
  }

  onSubmit(customerData: any) {
    const controls = this.reactiveForm.controls;

    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    // обработка данных формы
    // console.warn('Your order has been submitted', customerData);
    this.reactiveForm.reset();
  }

  isControlInvalid(controlName: string): boolean {
    // проверка на валидацию формы
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }


    sendData() {
    let inputValue = this.reactiveForm.value;

    let jsonStr = JSON.stringify(inputValue);
    console.log(jsonStr);

      return this.settings.placementOn(jsonStr);

   /*
    //   this.settings.placementOff(this.reactiveForm.value);
      // this.settings.robotOff(this.obj);
      // this.settings.robotOn(this.obj);
      // this.settings.activityOff(this.obj);
      // this.settings.activityOn(this.obj);

      // this.sds.saveAdministrative('szgm', 'administrative.save', 'dealDateCreate');
      // // this.sds.loadDealStages();
      // this.sds.saveProductionFields('szgm', 'administrative.save', this.obj);
      // this.sds.loadProjectByFilter('szgm', 'get.excel.data', 'message');
     */
    }
}

