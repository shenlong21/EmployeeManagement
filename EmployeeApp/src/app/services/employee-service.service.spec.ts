import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';

import { EmployeeServiceService } from './employee-service.service';

describe('EmployeeServiceService', () => {
  let service: EmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      providers: [EmployeeServiceService]
    });
    service = TestBed.inject(EmployeeServiceService);
    // controller = TestBed.inject(HttpClientModule)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('fetches all employees', () => {
    service.fetchEmployees().subscribe(
      (data) => {

      }
    )
  })


});
