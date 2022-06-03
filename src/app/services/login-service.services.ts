import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private userData:{ token: string,id:string, email:string}
  constructor(private http: HttpClient, private router: Router) {
    this.userData = {token:'',id:'',email:''}
  }

  postLogin(email: string, password: string) {
    this.http.post<any>("https://reseau.jdedev.fr/api/user/connect",{email:email,password:password}).subscribe({
      next:data=>{
      this.userData = data;
        this.router.navigateByUrl('/')
      },
      error:err=>{
        alert('Erreur de connexion')
      }
  })
  }
  getUsersData() {
    return this.userData;
  }
  getJwt() {
    return this.userData.token;
  }
  logout(){
    this.userData = {token:'',id:'',email:''};
  }
}
