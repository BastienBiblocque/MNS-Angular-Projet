import { Component, OnInit } from '@angular/core';
import { UsersServiceServices } from '../services/users-service.services';
import { LoginServiceService } from '../services/login-service.services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: [{ email: string; pseudo: string; id:number }] | undefined
  constructor(private UsersServices:UsersServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt();
    this.getUsers()
  }
  getUsers(): void {
    this.UsersServices.getUsers().subscribe((val: any) => {
      this.users = val;
    })
  }

  checkJwt(){
    if (!this.LoginServices.getJwt()) {
      this.router.navigateByUrl('/login');
    }
  }

  goToUserPage(id:number){
    console.log(id);
    this.router.navigateByUrl(`/users/${id}`);
  }

  ngOnInit(): void {
  }

}
