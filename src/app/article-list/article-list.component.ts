import { Component, OnInit } from '@angular/core';
import { ArticlesServiceServices } from "../services/articles-service.services";
import {LoginServiceService} from "../services/login-service.services";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  connectForm: FormGroup

  articles: [{ id_article: number; titre: string; contenu: string; id:number }] | undefined

  userId:string|undefined

  constructor(formBuilder: FormBuilder, private ArticlesService:ArticlesServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt();
    this.getArticles();
    //formulaire d'ajout de message
    this.connectForm = formBuilder.group({
      titre: new FormControl("", [
        Validators.required,
      ]),
      contenu: new FormControl("", [
        Validators.required,
      ]),
    })
  }

  getArticles(): void {
    this.articles=undefined;
    this.ArticlesService.getArticles().subscribe((val: any) => {
      this.articles = val;
    })
  }

  submitForm() {
    if (this.connectForm.valid) {
      this.ArticlesService.postArticle(this.connectForm.value.titre, this.connectForm.value.contenu).subscribe(() => {
        this.getArticles()
      })
    } else {
      alert('Erreur de formulaire');
    }
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
      this.getArticles();
    })
  }

}
