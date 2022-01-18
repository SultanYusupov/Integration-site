import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {RequestService} from "../services/request.service";
import {ApplicationStorageService} from "../services/application-storage.service";
import {installStep} from "../model/install-step";
import {CommonOptions, NgxMetrikaService} from "@kolkov/ngx-metrika";


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
  progress:number = 0;
  /*stages:Array<installStep> = [
    {
      name: "Поиск клиента",
      code: "client",
      status: false,
      show: false
    },
  ];*/
  installErrorMsg: any = 'Введите номер телефона';

  reactiveForm: any;
  public msg: string = '';
  public hideForm:boolean = false;
  public hideMsg:boolean = true;
  public alertSuccess:boolean = false;
  public alertFail:boolean = false;
  size: string = 'big'; // это для popup-window, анимация будет происходить не в css, а в angular
  public disabled: boolean = false;
  public wrongNumber:boolean = false;
  buttonText:string = 'Отправить';
  loading:boolean = false;

  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: RequestService,
              private as: ApplicationStorageService,
              private ym: NgxMetrikaService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.title = this.as.appName;
  }

// получаем данные формы
  initForm() {
    return this.reactiveForm = this.formBuilder.group({
      name: ['', [
        Validators.pattern(/[А-я]|[A-z]/)
      ]
      ],
      email: [''],
      telephone: ['', [
        Validators.required, Validators.pattern('^(8|\\+7)[\\- ]?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')
      ]
      ],
      comment: ['', [Validators.maxLength(80)]]
    });
  }

  onSubmit() {
    // обработка данных формы
    const controls = this.reactiveForm.controls;
    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.installErrorMsg = 'Введите правильный номер телефона';
      return;
    }
  }

  isControlInvalid(controlName: string): boolean {
    // проверка на валидацию формы
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

    // при нажатии "Закрыть" окно формы возвращается в первоначальное состояние
  rollback() {
    this.disabled = false;
    this.buttonText = 'Отправить';
    this.loading = false;
    this.size = 'big';
    this.alertSuccess = false;
    this.alertFail = false;
    this.hideForm = false;
    this.hideMsg = true;
    this.wrongNumber = false;
    this.reactiveForm.reset(); // очищает input при отправке
  }

  /*install(){
    let anketa = this.dialog.open(AnketaComponent, {
      minWidth: 500,
      data: {
        title: this.title,
        licenceLink: this.as.licenceLink
      },
      disableClose: true
    });
    anketa.afterClosed().subscribe((response:{
      phone: string,
      tarif: any,
      activeTo: Date,
      licence: boolean
    }) => {
      if (response.activeTo){
        response['offset'] = response.activeTo.getTimezoneOffset();
        response['activeToTs'] = response.activeTo.getTime()/1000
      }
      this.state.install = true;
      this.anketa = response;
    })
    // this.start();//Закомментировать кнопочку
  }*/


  start(){
    this.disabled = true;
    const controls = this.reactiveForm.controls;
    if (!this.reactiveForm.value.telephone) {
      this.onSubmit();
      this.installErrorMsg = 'Номер телефона должен быть обязателен';
      this.disabled = false;
    }
    else if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.installErrorMsg = 'Введите правильный номер телефона';
      this.disabled = false;
      return;
    }
    else {
      this.wrongNumber = false;
      this.installErrorMsg = '';
      // this.installStep(0, {
      //   anketa: this.anketa
      // })
      this.installStep();
      this.loading = !this.loading;
    }
    this.ym.reachGoal.next({target: 'FORM_SUBMISSION'});
  }
  installStep(){
    this.buttonText = 'Отправка..';
    let inputValue = this.reactiveForm.value;
      let requestParams = Object.assign({}, {
        name: inputValue.name,
        email: inputValue.email,
        telephone: inputValue.telephone,
        comment: inputValue.comment
      });
       console.log(requestParams);
      this.bs.request(requestParams)
        .subscribe((response) => {
           console.log(response.data);
            let message = response.message;
            let code = response.code;
            if(code == 0){
              this.loading = !this.loading;
              this.buttonText = 'Отправить';
              this.wrongNumber = true;
              console.log('message is: '+ message);
              this.installErrorMsg = message;
              this.disabled = false;
            }
            else {
              console.log('message is: '+ message);
              this.hideForm = !this.hideForm;
              this.size = 'small';
              this.hideMsg = !this.hideMsg;
              this.alertSuccess = !this.alertSuccess;
              this.msg = 'Ваша заявка отправлена';
              // this.ym.reachGoal.next({target: 'FORM_SENT'});
            }
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
  }

}

