import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

import { BackendService } from "../services/backend.service";
import { SettingsService } from "../services/settings.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  reactiveForm: any;
  public msg: string = '';
  public hideForm:boolean = false;
  public hideMsg:boolean = true;
  public alertSuccess:boolean = false;
  public alertFail:boolean = false;
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
    // кнопка "Отправить" становится неактивной
    // this.disabled = !this.disabled;

    let inputValue = this.reactiveForm.value;
    // преобразовываем обект с данными формы в json-строку
    let jsonStr = JSON.stringify(inputValue);
    console.log(jsonStr);

      return this.settings.placementOn(jsonStr).subscribe(data => {
        // при нажатии "Отправить", форма исчезает и появляется сообщение об успешном отправлении
        this.hideForm = !this.hideForm;
          this.hideMsg = !this.hideMsg;
          this.alertSuccess = !this.alertSuccess;
        this.msg = 'Ваша заявка отправлена';
      },
        err => {
          // при нажатии "Отправить", форма исчезает и появляется сообщение о неудачном отправлении
        this.hideForm = !this.hideForm;
          this.hideMsg = !this.hideMsg;
          this.alertFail = !this.alertFail;
        this.msg = 'Ошибка. Не удалось отправить заявку';
        });

    }
    // при нажатии "Закрыть" окно формы возвращается в первоначальное состояние
  rollback() {
    // this.disabled = false;
    this.alertSuccess = false;
    this.alertFail = false;
    this.hideForm = false;
    this.hideMsg = true;
  }
}

