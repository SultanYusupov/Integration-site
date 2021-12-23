import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

import { BackendService } from "../services/backend.service";
import { SettingsService } from "../services/settings.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
              private bs: BackendService,
              private settings: SettingsService) {
  }

  ngOnInit(): void {
    this.initForm();
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
        Validators.required, Validators.pattern('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$')
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

    sendData() {
    // значения из инпута в виде объекта
    let inputValue = this.reactiveForm.value;
    // преобразовываем обект с данными формы в json-строку
    let jsonStr = JSON.stringify(inputValue);
    console.log(jsonStr);

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

    }
    // при нажатии "Закрыть" окно формы возвращается в первоначальное состояние
  rollback() {
    // this.disabled = false;
    this.size = 'big';
    this.alertSuccess = false;
    this.alertFail = false;
    this.hideForm = false;
    this.hideMsg = true;
  }
}

