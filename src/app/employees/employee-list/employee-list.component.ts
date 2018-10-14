import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService,
  private tostr: ToastrService) { }

  ngOnInit() {
    const empData = this.employeeService.getData();
    empData.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const singleItem = element.payload.toJSON();
        singleItem['$key'] = element.key;
        this.employeeList.push(singleItem as Employee);
      });
    });
  }

  // On Edit.
  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }


  // On Delete.
  onDelete(key: string) {
    this.employeeService.deleteEmployee(key);
    this.tostr.warning('Employee deleted successfully!','Deleted');
  }
}
