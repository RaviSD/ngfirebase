import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }

  // Submit form.
  submitForm(employee: NgForm) {
    if(employee.value.$key === null) {
      this.employeeService.insertEmployee(employee.value);
    } else {
      this.employeeService.updateEmployee(employee.value);
    }
    this.resetForm(employee);
    this.toastrService.success('Successfully added!', 'Employee module');
  }

  // Reset form.
  resetForm(employee?: NgForm) {
    if(employee != null) {
      employee.reset();
    }
    this.employeeService.selectedEmployee = {
      $key: null,
      name: null,
      position: null,
      salary: 0,
      office: null
    };
  }


}
