import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.services';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceServices {
  constructor(private http: HttpClient, private LoginService:LoginServiceService) {
  }

  getUsers():any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<any>("https://reseau.jdedev.fr/api/user",{headers:headers})
  }
  getUserData(id:string):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<any>(`https://reseau.jdedev.fr/api/user/${id}`,{headers:headers})
  }

  deleteUser(id:string):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.delete<any>(`https://reseau.jdedev.fr/api/user/${id}`,{headers:headers})
  }

  updateUser(pseudo: string, email: string, password:string,avatar:string, id:string,):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.put<any>(`https://reseau.jdedev.fr/api/user/${id}`,{pseudo:pseudo,email:email,password:password,avatar:avatar}, {headers})
  }

}
