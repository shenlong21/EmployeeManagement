import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employeeList: Employee[] = [];
  formObject: FormGroup;

  // utilities
  delUser:string = "";
  delUserid: number = -1;
  delConfirmation:boolean = false;

  // flags 
  employeeListLoadingFlag: boolean = true;

  constructor(private employeeService: EmployeeServiceService) { 
    this.formObject = new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      employmentType: new FormControl("", Validators.required),
      contact: new FormControl("", [Validators.required,  Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormControl("", Validators.required),
      salary: new FormControl(0, [Validators.required, Validators.min(0)] ),
      formType: new FormControl("create", Validators.required)
    })
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeListLoadingFlag = true;
    this.employeeService.fetchEmployees().subscribe(data => {
      this.employeeList = data;
      this.employeeListLoadingFlag = false;
      console.log(data);
    })
  }

  setCreateForm() {
    this.formObject.reset();
    this.formObject.setValue({
      id: 1,
      name: "",
      department: "",
      employmentType: "",
      contact: "",
      address: "",
      salary: "",
      formType: "create"
    })
    // console.log(this.formObject.value);
    
  }

  setUpdateForm(employee: Employee) {
    this.formObject.setValue({
      id: employee.employeeId,
      name: employee.name,
      department: employee.department,
      employmentType: employee.employmentType,
      contact: employee.contact,
      address: employee.address,
      salary: employee.salary,
      formType: "update"
    })
    // console.log(this.formObject.value);
    
  } 

  onSubmit(formObj: FormGroup) {
    // console.log("Submit");
    // console.log(formObj.value);
    

    this.employeeService.addOrUpdateEmployee(formObj).subscribe(data => {
      // console.log(data);
      this.getEmployeeList();

      // automatically closing the modal after updation
      document.getElementById('modalClodeBtn')?.click();
    });
    
  }

  // set up values for showing in delete modal
  onDeleteEmp(id: number = -1, name: string) {
    this.delConfirmation = false;
    this.delUser = name;
    this.delUserid = id;
  }

  // deletes the employee by taking id 
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployeeList();
      this.delConfirmation = false;

      // automatically closing the modal after updation
      document.getElementById('deleteModalbtn')?.click();
      
    })
  }

  // used to enable the delete button
  toggleDelConfirmation() {
    this.delConfirmation = !this.delConfirmation;
  }

}
