import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let fakeEmployees: Employee[] = [];
  let fakeEmployeeService: Pick<EmployeeServiceService, keyof EmployeeServiceService>

  beforeEach(async () => {

    fakeEmployeeService = { 
      fetchEmployees(): Observable<Employee[]> {
        return of(fakeEmployees);
      },

      addOrUpdateEmployee(formVal: FormGroup): Observable<Employee> {
        

        let newEmp: Employee = {
          employeeId: formVal.value.id == null? fakeEmployees.length+1: formVal.value.id,
          name: formVal.value.name,
          department: formVal.value.department,
          employmentType: formVal.value.employmentType,
          contact: formVal.value.contact,
          address: formVal.value.address,
          salary: formVal.value.salary
        }

        if (formVal.value.formType == "create") {
          fakeEmployees.push(newEmp);
          return of(newEmp);
        }
        else {
          let empIndex = -1;
          for (let i = 0; i < fakeEmployees.length; i++) {
            if (fakeEmployees[i].employeeId == formVal.value.id) {
              empIndex = i;
              break;
            }
          }

          if (empIndex != -1) {
            fakeEmployees[empIndex] = newEmp;
            return of(newEmp);
          }
          else {
            return of();
          }
        }
      },

      deleteEmployee(id: number ) {
        let empIndex = -1;
        for (let i = 0; i < fakeEmployees.length; i++) {
          if (fakeEmployees[i].employeeId == id) {
            empIndex = i;
            break;
          }
        }

        if (empIndex == -1) {
          return of();
        }
        else {
          fakeEmployees.splice(empIndex,1);
          return of(fakeEmployees[empIndex]);
        }

      }

    };

    spyOn(fakeEmployeeService, 'fetchEmployees').and.callThrough();
    spyOn(fakeEmployeeService, 'addOrUpdateEmployee').and.callThrough();
    spyOn(fakeEmployeeService, 'deleteEmployee').and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule, AppRoutingModule],
      providers: [
        { provide: EmployeeServiceService, useValue: fakeEmployeeService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the delUser and delUserid variables', () => {
    component.onDeleteEmp(1, 'sachin');

    expect(component.delUserid).toBe(1);
    expect(component.delUser).toBe('sachin')
  })

  it ('should toggle value of delConfirmation variable', () => {
    expect(component.delConfirmation).toBeFalse;
    component.toggleDelConfirmation();
    expect(component.delConfirmation).toBeTrue();
  })


  it ('should create a new employee', () => {
    let currentCount = fakeEmployees.length;

    component.formObject.setValue({
      id: null,
      name: "New Employee",
      department: "Finance",
      employmentType: "Contractual",
      contact: "9991999191",
      address: "An Awesome Adrress",
      salary: 1234,
      formType: "create"
    })

    component.onSubmit(component.formObject);
    console.log(fakeEmployees);
    
    expect(currentCount + 1 ).toEqual(fakeEmployees.length);
  })

  it ('should create a another employee', () => {
    let currentCount = fakeEmployees.length;

    component.formObject.setValue({
      id: null,
      name: "New Employee 2",
      department: "Finance",
      employmentType: "Contractual",
      contact: "9991999191",
      address: "An Awesome Adrress",
      salary: 1234,
      formType: "create"
    })

    component.onSubmit(component.formObject);
    console.log(fakeEmployees);
    
    expect(currentCount + 1 ).toEqual(fakeEmployees.length);

  })

  it ( 'should give employee list', () => {
    component.getEmployeeList();

    let empList = component.employeeList;

    expect(fakeEmployeeService.fetchEmployees).toHaveBeenCalled();
    expect(empList.length).toBeGreaterThanOrEqual(0);
  })

  it ('should update the employee address to "Argusoft, Gandhinagar" [id given is "1"]', () => {

    let empIndex: number = -1;

    for (let i = 0; i < fakeEmployees.length; i++) {
      if (fakeEmployees[i].employeeId == 1) {
        empIndex = i;
        break;
      }
    }

    component.formObject.setValue({
      id: 1,
      name: "New Employee 2",
      department: "Finance",
      employmentType: "Contractual",
      contact: "9991999191",
      address: "Argusoft, Gandhinagar",
      salary: 1234,
      formType: "update"
    })

    component.onSubmit(component.formObject);

    // found the employee
    expect(empIndex).toBeGreaterThan(-1);
    // update check
    expect(fakeEmployees[empIndex].address).toBe("Argusoft, Gandhinagar");

  })

  it ('should delete employee with given id [id given is "1"]', () => {
    let id: number = 1;
    let empListLengthBefore: number = fakeEmployees.length;

    component.deleteEmployee(id);

    let empListLengthAfter: number = fakeEmployees.length;


    expect(empListLengthBefore).toBe(empListLengthAfter+1)

  })


});
