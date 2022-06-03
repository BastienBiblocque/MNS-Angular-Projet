import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestServiceServices {
  private test:string
  constructor() {
    this.test=''
  }
  getTestUnitaire() {
    return this.test;
  }
  setTestUnitaire(value:string) {
    this.test=value;
  }
}
