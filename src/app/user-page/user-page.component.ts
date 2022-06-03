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

  userData: { email: string; pseudo: string; id:number;avatar:string }
  comments:[ { contenu:string; creation:string; id:number; id_article:number; id_commentaire:number } ] | undefined
  articles: [{ id_article: number; titre: string; contenu: string; id:number }] | undefined
  canUpdateDelete:boolean|undefined
  pseudoUpdate:string
  mailUpdate:string
  passwordUpdate:string
  avatarUpdate:string

  constructor(private ArticlesServices:ArticlesServiceServices,private UsersServices:UsersServiceServices,private CommentServices:CommentServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt();
    this.userData = {email:'',pseudo:'', id:0,avatar:''}
    this.getUserData()
    this.getUserComments();
    this.getUserArticles();
    this.setCanUpdateDelete();
    this.pseudoUpdate='';
    this.mailUpdate='';
    this.passwordUpdate='';
    this.avatarUpdate='';
  }

  getUserData(): void {
    const url = this.router.url.split('/')
    this.UsersServices.getUserData(url[url.length - 1]).subscribe((val: any) => {
      this.userData = val;
      this.pseudoUpdate=val.pseudo;
      this.mailUpdate=val.email;
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

  deleteUser(){
    const url = this.router.url.split('/')
    if (this.articles || this.comments) {
      alert('Vous avez post des data supprésion impossible')
    } else {
      this.UsersServices.deleteUser(url[url.length - 1]).subscribe(() => {
        this.router.navigateByUrl('/login');
      })
    }
  }

  setCanUpdateDelete(){
    const url = this.router.url.split('/')
    const currentUserData = this.LoginServices.getUsersData();
    if (url[url.length - 1].toString() === currentUserData.id.toString()) {
      this.canUpdateDelete=true;
    }
  }

  updateProfil(){
    const url = this.router.url.split('/');
    const regex = new RegExp(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);
    if (regex.test(this.passwordUpdate)){
      this.UsersServices.updateUser( this.pseudoUpdate, this.mailUpdate, this.passwordUpdate,this.avatarUpdate, url[url.length - 1], ).subscribe(() => {
        this.getUserData()
      })
    } else {
      alert('Mot de passe non conforme');
    }

  }

  ngOnInit(): void {
  }

}
