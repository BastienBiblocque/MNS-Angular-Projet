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

  postArticle(titre: string, contenu: string):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.post<any>("https://reseau.jdedev.fr/api/article",{titre:titre,contenu:contenu}, {headers})
  }

  deleteArticle(id:number):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.delete<any>(`https://reseau.jdedev.fr/api/article/${id}`,{headers:headers})
  }
}
