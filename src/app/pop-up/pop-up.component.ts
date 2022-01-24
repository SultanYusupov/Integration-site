import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Router } from '@angular/router';

import {RequestService} from "../services/request.service";
import {ApplicationStorageService} from "../services/application-storage.service";
import {NgxMetrikaService} from "@kolkov/ngx-metrika";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
  animations: [
    trigger('sizeOfForm', [
      state('big', style({
        height: '510px'
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
  installErrorMsg: any = '';

  reactiveForm: any;
  public msg: string = '';
  public hideForm:boolean = false;
  public hideMsg:boolean = true;
  public alertSuccess:boolean = false;
  public alertFail:boolean = false;
  size: string = 'big'; // это для popup-window, анимация будет происходить не в css, а в angular
  public disabled: boolean = true;
  public wrongNumber:boolean = false;
  buttonText:string = 'Отправить';
  loading:boolean = false; // анимация загрузки
  constructor(public integrationService: IntegrationService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private bs: RequestService,
              private as: ApplicationStorageService,
              private ym: NgxMetrikaService,
              private router: Router) {
  }
  // текущий адрес. убираем лишнее, чтобы остались только названия систем
  currentUrl = this.router.url.replace(/\/products\//, '');

  ngOnInit(): void {
    this.initForm();
    this.title = this.as.appName;
  }

// получаем данные формы
  initForm() {
    return this.reactiveForm = this.formBuilder.group({
      name: ['', [Validators.pattern(/[А-я]|[A-z]/), Validators.maxLength(12)]],
      email: [''],
      telephone: ['', [
        Validators.required,
        // Validators.pattern('^[+?][0-9]+|\(|\)| |-'),
        // Validators.pattern(/^\+?[^a-z|A-Z|А-Я]+/),
        Validators.maxLength(18)]],
      comment: ['', [Validators.maxLength(80)]]
    });
  }

  private numberValidator(control: FormControl) {
    const value = control.value;
    if (value.length == 0) {
      this.installErrorMsg = 'Номер телефона должен быть обязательным'
    }
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const numberNotValid = hasCapitalLetter && hasLowercaseLetter;

    if (numberNotValid) {
      this.installErrorMsg = 'В номере телефона не должно быть букв';
    }
  }

  onSubmit() {
    // обработка данных формы
    const controls = this.reactiveForm.controls;
    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      this.installErrorMsg = 'В номере телефона не должно быть букв';
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
    // перед тем, как отправить данные, хотел сделать валидацию при нажатии "Отправить"

    // this.disabled = true;
    // const controls = this.reactiveForm.controls;
    // if (!this.reactiveForm.value.telephone) {
    //   this.onSubmit();
    //   this.installErrorMsg = 'Номер телефона должен быть обязателен';
    //   this.disabled = false;
    // }
    // else if (this.reactiveForm.invalid) {
    //   Object.keys(controls)
    //     .forEach(controlName => controls[controlName].markAsTouched());
    //   this.installErrorMsg = 'Введите правильный номер телефона';
    //   // this.disabled = false;
    //   return;
    // }
    //else {
      this.wrongNumber = false;
      // this.installErrorMsg = '';
      // this.installStep(0, {
      //   anketa: this.anketa
      // })
      // к комментарию добавляем какие системы выбрал пользователь
      this.reactiveForm.value.comment += ' '+this.currentUrl;
      this.installStep();
      this.loading = !this.loading;
    //}
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

