import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employeeData } from 'src/app/dto/all-data';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  employeeDTO: employeeData = new employeeData;
  allEmployee: any;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      BasicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.getdata()
  }

  add() {
    this.showAdd = true
    this.showUpdate = false
  }

  edit(data: any) {
    this.showAdd = false;
    this.showUpdate = true
    this.employeeDTO.id = data.id;

    this.formValue.controls['username'].setValue(data.username)
    this.formValue.controls['firstName'].setValue(data.firstName)
    this.formValue.controls['lastName'].setValue(data.lastName)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['birthDate'].setValue(data.birthDate)
    this.formValue.controls['BasicSalary'].setValue(data.BasicSalary)
    this.formValue.controls['status'].setValue(data.status)
    this.formValue.controls['group'].setValue(data.group)
    this.formValue.controls['description'].setValue(data.description)
  }

  update() {
    this.employeeDTO.username = this.formValue.value.username
    this.employeeDTO.firstName = this.formValue.value.firstName
    this.employeeDTO.lastName = this.formValue.value.lastName
    this.employeeDTO.email = this.formValue.value.email
    this.employeeDTO.birthDate = this.formValue.value.birthDate
    this.employeeDTO.BasicSalary = this.formValue.value.BasicSalary
    this.employeeDTO.status = this.formValue.value.status
    this.employeeDTO.group = this.formValue.value.group
    this.employeeDTO.description = this.formValue.value.description

    this.api.updateEmployee(this.employeeDTO, this.employeeDTO.id).subscribe(res => {
      this.formValue.reset();
      this.getdata();
      alert("Record updated sucessfully");
    },
      err => {
        alert("something went wrong")
      })
  }

  addEmployee() {
    this.employeeDTO.username = this.formValue.value.username
    this.employeeDTO.firstName = this.formValue.value.firstName
    this.employeeDTO.lastName = this.formValue.value.lastName
    this.employeeDTO.email = this.formValue.value.email
    this.employeeDTO.birthDate = this.formValue.value.birthDate
    this.employeeDTO.BasicSalary = this.formValue.value.BasicSalary
    this.employeeDTO.status = this.formValue.value.status
    this.employeeDTO.group = this.formValue.value.group
    this.employeeDTO.description = this.formValue.value.description

    this.api.postEmployee(this.employeeDTO).subscribe(res => {
      alert("Record added sucessfully");
      this.getdata()
    }, err => {
      alert("something went wrong!!!");
    })
    console.log(this.employeeDTO, 'test')
  }

  getdata() {
    this.api.getEmployee()
      .subscribe(res => {
        this.allEmployee = res;
      })
  }

  deleteEmployeee(data: any) {
    if (confirm('Are you sure to delete?'))
      this.api.deleteEmployee(data.id)
        .subscribe(res => {
          alert("Record deleted successfully");
          this.getdata();
        })
  }
}

