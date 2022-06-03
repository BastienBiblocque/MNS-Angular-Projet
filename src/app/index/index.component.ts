import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../services/login-service.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt();
  }

  checkJwt(){
    if (!this.LoginServices.getJwt()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/articles');
    }
  }

  ngOnInit(): void {
  }

}
