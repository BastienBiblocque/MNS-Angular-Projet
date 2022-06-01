import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {SignServiceServices} from "../services/sign-service.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  connectForm: FormGroup
  constructor(formBuilder: FormBuilder, private SignService:SignServiceServices, private router: Router) {
    this.connectForm = formBuilder.group({
      mail: new FormControl("", [
        Validators.required,
        this.validatorRe(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl("", [
        Validators.required,
        this.validatorRe(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/),
      ]),
      passwordVerif: new FormControl("", [
        Validators.required,
        this.validatorRe(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/),
      ]),
      pseudo: new FormControl("", [
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
  }

  validatorRe(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : { forbiddenName: { value: control.value } };
    };
  }

  retApi: any
  submitForm() {
    if (this.connectForm.valid) {
      if (this.connectForm.value.password === this.connectForm.value.passwordVerif){
        this.SignService.postSign(this.connectForm.value.mail,this.connectForm.value.pseudo,this.connectForm.value.password);
        this.router.navigateByUrl('/login');
      } else {
        alert('Les mots de passes ne sont pas similaire');
      }
    } else {
      alert('form not good');
    }
  }

}
