import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  connectForm: FormGroup
  constructor(formBuilder: FormBuilder, private LoginService:LoginServiceService) {
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

  retApi: any

  submitForm() {
    if (this.connectForm.valid) {
      this.LoginService.postLogin(this.connectForm.value.mail,this.connectForm.value.password)
    }
    else {
      alert('il y a une erreur dans le formulaire')
    }
  }
}


