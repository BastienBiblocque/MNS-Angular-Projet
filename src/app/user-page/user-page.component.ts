import { Component, OnInit } from '@angular/core';
import {UsersServiceServices} from "../services/users-service.services";
import {LoginServiceService} from "../services/login-service.services";
import {Router} from "@angular/router";
import {CommentServiceServices} from "../services/comment-service.services";
import {ArticlesServiceServices} from "../services/articles-service.services";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userData: { email: string; pseudo: string; id:number }
  comments:[ { contenu:string; creation:string; id:number; id_article:number; id_commentaire:number } ] | undefined
  articles: [{ id_article: number; titre: string; contenu: string; id:number }] | undefined

  constructor(private ArticlesServices:ArticlesServiceServices,private UsersServices:UsersServiceServices,private CommentServices:CommentServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt();
    this.userData = {email:'',pseudo:'', id:0}
    this.getUserData()
    this.getUserComments();
    this.getUserArticles();
  }
  getUserData(): void {
    const url = this.router.url.split('/')
    this.UsersServices.getUserData(url[url.length - 1]).subscribe((val: any) => {
      this.userData = val;
    })
  }

  getUserComments(): void {
    const url = this.router.url.split('/')
    this.CommentServices.getCommentFromUser(url[url.length - 1]).subscribe((val: any) => {
      this.comments = val.slice(0,5);
    })
  }

  getUserArticles(): void {
    const url = this.router.url.split('/')
    this.ArticlesServices.getArticlesFromUser(url[url.length - 1]).subscribe((val: any) => {
      this.articles = val.slice(0,5);
    })
  }

  checkJwt(){
    if (!this.LoginServices.getJwt()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

}
