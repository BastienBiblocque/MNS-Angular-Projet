import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignServiceServices {
  constructor(private http: HttpClient) {
  }
  postSign(email: string, pseudo: string, password: string) {
    this.http.post<any>("https://reseau.jdedev.fr/api/user",{email:email,password:password,pseudo:pseudo,avatar:''}).subscribe(data=>{
      return 'users sign';
    })
  }
}
