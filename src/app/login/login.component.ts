import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  connectForm: FormGroup
  constructor(formBuilder: FormBuilder) {
    this.connectForm = formBuilder.group({
      mail: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl("", [
        Validators.required,
      ])
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.connectForm.valid) {
      alert('Le formulaire est ok')
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }
}


