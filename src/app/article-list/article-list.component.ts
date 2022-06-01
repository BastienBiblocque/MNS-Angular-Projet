import { Component, OnInit } from '@angular/core';
import { ArticlesServiceServices } from "../services/articles-service.services";
import {LoginServiceService} from "../services/login-service.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: [{ id_article: number; titre: string; contenu: string; id:number }] | undefined

  constructor(private ArticlesService:ArticlesServiceServices, private LoginServices:LoginServiceService, private router: Router) {
    this.checkJwt()
    this.getArticles()
  }

  getArticles(): void {
    this.ArticlesService.getArticles().subscribe((val: any) => {
      this.articles = val;
      console.log(this.articles)
    })
  }

  ngOnInit(): void {
  }
  checkJwt(){
    if (!this.LoginServices.getJwt()) {
      this.router.navigateByUrl('/login');
    }
  }
}
