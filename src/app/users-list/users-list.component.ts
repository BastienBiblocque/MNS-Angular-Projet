import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  taches: [{ task: string, date: string }]
  constructor() {
    this.taches = [
      {task:'promener le chien',date:'15-01-2020'},
    ]
  }

  ajoutTache() {
    this.taches.push({task:'test',date:'15-25-2502'})
  }

  ngOnInit(): void {
  }
  // ajoutTache() {
  //   this.taches.push(this.tacheEnCour)
  //   this.tacheEnCour = ""
  // }

}
