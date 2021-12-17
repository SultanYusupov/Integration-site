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
  private obj = '{"name" : "name"}';
  private code: any;
  private moduleId = "szgm";
  reactiveForm: any;
  public msg: string = '';
  public hidefrm:boolean = false;
  public hideMsg:boolean = true;
  public alertSuccess:boolean = false;
  public alertFail:boolean = false;
  public disabled: boolean = false;

  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: BackendService,
              private settings: SettingsService) {

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
    // обработка данных формы
    const controls = this.reactiveForm.controls;

    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    // очищает input при отправке
    this.reactiveForm.reset();
  }

  isControlInvalid(controlName: string): boolean {
    // проверка на валидацию формы
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

    sendData() {
    // кнопка "Отправить" становится не активной
    this.disabled = !this.disabled;

    let inputValue = this.reactiveForm.value;

    let jsonStr = JSON.stringify(inputValue);
    console.log(jsonStr);

      return this.settings.placementOn(jsonStr).subscribe(data => {
        // при нажатии "Отправить", форма исчезает и появляется сообщение об отправлении
        this.hidefrm = !this.hidefrm;
          this.hideMsg = !this.hideMsg;
          this.alertSuccess = !this.alertSuccess;
        this.msg = 'Ваша заявка отправлена';
        this.disabled = !this.disabled;
      },
        err => {
          // при нажатии "Отправить", форма исчезает и появляется сообщение об отправлении
        this.hidefrm = !this.hidefrm;
          this.hideMsg = !this.hideMsg;
          this.alertFail = !this.alertFail;
        this.msg = 'Ошибка. Не удалось отправить заявку';
          this.disabled = !this.disabled;
        });

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

