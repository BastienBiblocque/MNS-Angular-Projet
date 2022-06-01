import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.services';

@Injectable({
  providedIn: 'root'
})
export class ArticlesServiceServices {
  constructor(private http: HttpClient, private LoginService:LoginServiceService) {
  }

  getArticles():any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<any>("https://reseau.jdedev.fr/api/article",{headers:headers})
  }
}
