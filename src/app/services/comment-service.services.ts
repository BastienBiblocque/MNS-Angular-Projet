import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.services';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceServices {
  constructor(private http: HttpClient, private LoginService:LoginServiceService) {
  }

  getCommentFromUser(id:string):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<any>(`https://reseau.jdedev.fr/api/user/${id}/comment`,{headers:headers})
  }

  getComments():any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.get<any>(`https://reseau.jdedev.fr/api/comment`,{headers:headers})
  }

  postComment(contenu:string, id:number):any {
    const jwt = this.LoginService.getJwt();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    return this.http.post<any>(`https://reseau.jdedev.fr/api/comment`,{contenu:contenu,idArt:id},{headers:headers})
  }

}
