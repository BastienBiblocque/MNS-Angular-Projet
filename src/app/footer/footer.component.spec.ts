import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  //
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ FooterComponent ]
  //   })
  //   .compileComponents();
  // });
  //
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Should get my name', () => {
    let element: DebugElement = fixture.debugElement
    let el = element.query(By.css('.grid-flow-col > p:nth-child(2)'))
    expect(el.nativeElement.textContent).toBe("Créer par Bastien Biblocque - Angular - 2022");
  })
});
