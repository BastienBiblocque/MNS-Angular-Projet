import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestServiceServices} from "./services/test-service.services";
describe('AppComponent', () => {
  let service: TestServiceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestServiceServices);
  });

  it('Should have a test data', () => {
    service.setTestUnitaire('123');
    expect(service.getTestUnitaire()).toBe('123');
  });
});
