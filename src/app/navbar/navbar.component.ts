import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../services/login-service.services";
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private LoginService:LoginServiceService, private router: Router) {
  }

  get jwt(): string {
    return this.LoginService.getJwt();
  }
  logout():void{
    this.LoginService.logout();
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
  }

}
