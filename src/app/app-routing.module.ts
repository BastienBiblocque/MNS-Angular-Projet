import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {SignComponent} from "./sign/sign.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {ArticleListComponent} from "./article-list/article-list.component";

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'login', component: LoginComponent},
  {path:'sign', component: SignComponent},
  {path:'users', component:UsersListComponent},
  {path:'articles', component:ArticleListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
