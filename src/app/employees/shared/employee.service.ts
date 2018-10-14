import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();
  constructor(private firebase: AngularFireDatabase) { }

  // Get Data function.
  getData() {
    this.employeeList = this.firebase.list('employees');
    console.log('CHECKING EMPLOYEE LIST GET DATA-->', this.employeeList);
    return this.employeeList;
  }

  // Insert.
  insertEmployee(employee: Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // Update.
  updateEmployee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // Delete.
  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
}
