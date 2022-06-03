import { Component, OnInit } from '@angular/core';
import { ArticlesServiceServices } from "../services/articles-service.services";
import {LoginServiceService} from "../services/login-service.services";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentServiceServices} from "../services/comment-service.services";
import {UsersServiceServices} from "../services/users-service.services";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  connectForm: FormGroup
  connectFormComment: FormGroup

  articles: [{ id_article: number; titre: string; contenu: string; id:number; auteur:string; commentaire:[{ id_commentaire: number; contenu: string; id:number; id_article:number; auteur:string }]}]

  titreUpdate:string
  contenuUpdate:string
  idUpdate:number

  commentaireUpdate:string;
  idToUpdate:number;

  idArticleToAddComment:number
  commentToAdd:string

  userId:string|undefined

  constructor(formBuilder: FormBuilder, private UsersService:UsersServiceServices,private CommentService:CommentServiceServices,private ArticlesService:ArticlesServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.articles = [{ id_article: 0, titre: '', contenu: '', id:0, auteur:'',commentaire:[{ id_commentaire: 0, contenu: '', id:0, id_article:0, auteur:'' }] }];
    this.titreUpdate='';
    this.contenuUpdate='';
    this.idUpdate=0;
    this.idArticleToAddComment=0;
    this.commentToAdd='';
    this.idToUpdate=0;
    this.commentaireUpdate='';

    this.checkJwt();
    this.getArticlesAndComment();
    //formulaire d'ajout d'article
    this.connectForm = formBuilder.group({
      titre: new FormControl("", [
        Validators.required,
      ]),
      contenu: new FormControl("", [
        Validators.required,
      ]),
    })
    //formulaire d'ajout d'un commentaire
    this.connectFormComment = formBuilder.group({
      contenu: new FormControl("", [
        Validators.required,
      ]),
    })
  }

  getArticlesAndComment(): void {
    this.articles = [{ id_article: 0, titre: '', contenu: '', id:0, auteur:'',commentaire:[{ id_commentaire: 0, contenu: '', id:0, id_article:0, auteur:'' }] }];
    this.articles.shift();
    let articlesList:Array<any>;
    this.ArticlesService.getArticles().subscribe((val: any) => {
      articlesList = val;
      let usersList:Array<any>;
      this.UsersService.getUsers().subscribe((val: any) => {
        usersList = val;
        let commentsList:Array<any>;
        this.CommentService.getComments().subscribe((val: any) => {
          articlesList.forEach((element)=>{
            const auteur = usersList.find(user=>user.id === element.id)
            if(auteur) {
              element.auteur = auteur.pseudo;
            } else {
              element.auteur = '';
            }
            element.commentaire = [];
            commentsList = val;
            this.articles?.push(element);
          })
          commentsList.forEach((comment: { id_commentaire: number; contenu: string; id: number; id_article: number; auteur:string })=>{
            const auteur = usersList.find(user=> user.id === comment.id )
            if (auteur) {
              comment.auteur = auteur.pseudo
            } else {
              comment.auteur = '';
            }
            const articleIndex = this.articles?.findIndex(article=> article.id_article === comment.id_article);
            this.articles[articleIndex].commentaire.push(comment)
          })
        })
      })
    })
  }

  submitForm() {
    if (this.connectForm.valid) {
      this.ArticlesService.postArticle(this.connectForm.value.titre, this.connectForm.value.contenu).subscribe(() => {
        this.getArticlesAndComment()
      })
    } else {
      alert('Erreur de formulaire');
    }
  }

  setUpdatedData(titreUpdate:string, contenueUpdate:string, id:number){
    this.titreUpdate = titreUpdate;
    this.contenuUpdate = contenueUpdate;
    this.idUpdate=id;
  }

  setPostCommentData(id:number){
    this.idArticleToAddComment=id;
  }

  submitUpdate() {
    this.ArticlesService.updateArticle( this.titreUpdate, this.contenuUpdate, this.idUpdate).subscribe(() => {
      this.getArticlesAndComment()
    })
  }

  ngOnInit(): void {
  }
  checkJwt(){
    if (!this.LoginServices.getJwt()) {
      this.router.navigateByUrl('/login');
    } else {
      this.userId = this.LoginServices.getUsersData().id;
    }
  }

  deleteArticle(id: number){
    this.ArticlesService.deleteArticle(id).subscribe(()=>{
      this.getArticlesAndComment();
    })
  }

  submitAddComment() {
    this.CommentService.postComment(this.commentToAdd, this.idArticleToAddComment).subscribe(() => {
      this.getArticlesAndComment()
    })
  }

  submitUpdateComment(){
    this.CommentService.updateComment(this.commentaireUpdate, this.idToUpdate).subscribe(() => {
      this.getArticlesAndComment()
    })
  }

  setUpdateCommentData(contenu:string,id:number){
    this.commentaireUpdate = contenu;
    this.idToUpdate = id;
  }
  deleteCommentaire(id:number) {
    this.CommentService.deleteComment(id).subscribe(() => {
      this.getArticlesAndComment()
    })
  }
}
