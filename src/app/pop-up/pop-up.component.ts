import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { BackendService } from "../services/backend.service";
import { SettingsService } from "../services/settings.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {RequestService} from "../services/request.service";
import {ApplicationStorageService} from "../services/application-storage.service";
import {installStep} from "../model/install-step";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  animations: [
    trigger('sizeOfForm', [
      state('big', style({
        minHeight: '510px'
      })),
      state('small', style({
        height: '105px'
      })),
      transition('big => small', animate('1s 0.2s linear'))
    ])
  ]
})
export class PopUpComponent implements OnInit {
  title = 'Наименование приложения';

  state = {
    install: false
  };
  stages:Array<installStep> = [
    {
      name: "Поиск клиента",
      code: "client",
      status: false,
      show: false
    },
  ];
  installErrorMsg: string = '';

  anketa: any;

  public errorInputMsg: string = 'Введите номер телефона'
  reactiveForm: any;
  public msg: string = '';
  public hideForm:boolean = false;
  public hideMsg:boolean = true;
  public alertSuccess:boolean = false;
  public alertFail:boolean = false;
  size: string = 'big'; // это для popup-window, анимация будет происходить не в css, а в angular
  // public disabled: boolean = false;

  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: RequestService,
              private as: ApplicationStorageService,
              private settings: SettingsService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.title = this.as.appName;
    this.install();
  }

  initForm() {
    // получаем данные формы
    return this.reactiveForm = this.formBuilder.group({
      name: ['', [
        Validators.pattern(/[А-я]/)
      ]
      ],
      email: ['', [
        Validators.email
      ]
      ],
      telephone: ['', [
        Validators.required, Validators.pattern('/((8|\\+7)-?)?\\(?\\d{3,5}\\)?-?\\d{1}-?\\d{1}-?\\d{1}-?\\d{1}-?\\d{1}((-?\\d{1})?-?\\d{1})?/')
      ]
      ],
      comment: ['']
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

    /*sendData() {
    // значения из инпута в виде объекта
    let inputValue = this.reactiveForm.value;
    // преобразовываем обект с данными формы в json-строку
    let jsonStr = JSON.stringify(inputValue);

    // метод post находится в backend.service
    return this.settings.placementOn(jsonStr).subscribe(data => {
        // при нажатии "Отправить", форма исчезает и появляется сообщение об успешном отправлении
        this.hideForm = !this.hideForm;
        this.size = 'small';
          this.hideMsg = !this.hideMsg;
          this.alertSuccess = !this.alertSuccess;
        this.msg = 'Ваша заявка отправлена';
      },
        err => {
          // при нажатии "Отправить", форма исчезает и появляется сообщение о неудачном отправлении
        this.hideForm = !this.hideForm;
          this.size = 'small';
          this.hideMsg = !this.hideMsg;
          this.alertFail = !this.alertFail;
        this.msg = 'Ошибка. Не удалось отправить заявку';
        });

    }*/
    // при нажатии "Закрыть" окно формы возвращается в первоначальное состояние
  rollback() {
    // this.disabled = false;
    this.size = 'big';
    this.alertSuccess = false;
    this.alertFail = false;
    this.hideForm = false;
    this.hideMsg = true;
  }

  install(){
    // let anketa = this.dialog.open(AnketaComponent, {
    //   minWidth: 500,
    //   data: {
    //     title: this.title,
    //     licenceLink: this.as.licenceLink
    //   },
    //   disableClose: true
    // });
    // anketa.afterClosed().subscribe((response:{
    //   phone: string,
    //   tarif: any,
    //   activeTo: Date,
    //   licence: boolean
    // }) => {
    //   if (response.activeTo){
    //     response['offset'] = response.activeTo.getTimezoneOffset();
    //     response['activeToTs'] = response.activeTo.getTime()/1000
    //   }
    //   this.state.install = true;
    //   this.anketa = response;
    // })
    // this.start();//Закомментировать кнопочку

  }
  start(){
    this.installStep(0, {
      anketa: this.anketa
    })
  }
  installStep(stepNo: number, prevStepData?:any){
    // console.log(`start step ${stepNo}`, prevStepData);
    let inputValue = this.reactiveForm.value;
    let step = this.stages[stepNo];
    if (step){
      step.show = true;
      // console.log('step', step);
      if (!prevStepData){
        prevStepData = {};
      }
      let requestParams = Object.assign({}, prevStepData, {
        name: inputValue.name,
        email: inputValue.email,
        telephone: inputValue.telephone,
        comment: inputValue.comment
      });
      // console.log('sent request', requestParams);
      this.bs.request('app.install2', requestParams)
        .subscribe(response => {
           console.log(response.data);
           console.log('Response success!');
           // let message = response.message;
            let code = response.code;
            if(code == 0){
              /*this.hideForm = !this.hideForm;
              this.size = 'small';
              this.hideMsg = !this.hideMsg;
              this.alertFail = !this.alertFail;
              this.msg = 'Ошибка. Не удалось отправить заявку';*/
              this.errorInputMsg = 'Введите валидный номер телефона';
            }
            else {
              this.hideForm = !this.hideForm;
              this.size = 'small';
              this.hideMsg = !this.hideMsg;
              this.alertSuccess = !this.alertSuccess;
              this.msg = 'Ваша заявка отправлена';
            }
          /*let next = response.data.next;
          if (response.data.result){
            if (response.data.result.message){
              step.resultMessage = response.data.result.message;
            }
            if (response.data.result.data){
              step.resultData = response.data.result.data;
            }
          }
          step.status = true;
          if (next){
            this.installStep(next, Object.assign({}, prevStepData, step.resultData));
          } else {
            // console.log('install finish');

            if (response.data.error){
              this.installErrorMsg = response.data.error;
            } else {
              this.installFinish();
            }
            this.state.install = false;
          }*/
        },
        error=> {
          console.log(error);
          console.log('Fail');
          this.hideForm = !this.hideForm;
          this.size = 'small';
          this.hideMsg = !this.hideMsg;
          this.alertFail = !this.alertFail;
          this.msg = 'Ошибка. Не удалось отправить заявку';
        }
        )
    } else {
      // console.log('install finish');
    }
  }
  installFinish(){
    let cmd = 'setInstallFinish:'
      + ':' + this.uniqid()
      + (!!this.as.APP_SID ? (':' + this.as.APP_SID) : '');
    // console.log(cmd);
    // console.log('http'+(this.as.PROTOCOL?'s':'')+'://' + this.as.DOMAIN);
    setTimeout(() => {
      parent.postMessage(cmd, 'http'+(this.as.PROTOCOL?'s':'')+'://' + this.as.DOMAIN);
    }, 2000);
  }
  uniqid() {
    let s = '';
    let charsList = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i <32; i++)
      s += charsList[Math.round(Math.random()*(charsList.length-1))];
    return s;
  }

  next() {
    this.installFinish();
    this.state.install = false;

  }

}

