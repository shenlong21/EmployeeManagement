import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private apiUrl = environment.baseUrl + 'api/EmployeeDetail';

  constructor(private http: HttpClient) { }

  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addOrUpdateEmployee(formVal: FormGroup): Observable<Employee> {

    let newEmp: Employee = {
      employeeId: formVal.value.id,
      name: formVal.value.name,
      department: formVal.value.department,
      employmentType: formVal.value.employmentType,
      contact: formVal.value.contact,
      address: formVal.value.address,
      salary: formVal.value.salary
    }

    if(formVal.value.formType == "create") {
      newEmp.employeeId = undefined;
      return this.http.post<Employee>(this.apiUrl, newEmp);
    }
    else {
      return this.http.put<Employee>(this.apiUrl + "/" + formVal.value.id, newEmp);
    }
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.apiUrl+'/'+id);
  }

}
