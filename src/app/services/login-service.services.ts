import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private userData:{ token: string,id:string, email:string}
  constructor(private http: HttpClient) {
    this.userData = {token:'',id:'',email:''}
  }

  postLogin(email: string, password: string) {
    this.http.post<any>("https://reseau.jdedev.fr/api/user/connect",{email:email,password:password}).subscribe(data=>{
      this.userData=data;
      return 'users log';
    })
  }
  getUsersData() {
    return this.userData;
  }
  getJwt() {
    return this.userData.token;
    // return 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3LCJuaXZlYXUiOjEsImlhdCI6MTY1NDE1NTQ3MiwiZXhwIjoxNjU0MTYyNjcyfQ.NY0OVeI170gmKI3FW8BcadZWPrx1_S6PhPBgKZTvumNtU5F6s4zox3Up50BpxOJDhSU4VhDT684-0eaoBCd80w'
  }
  logout(){
    this.userData = {token:'',id:'',email:''};
  }
}
