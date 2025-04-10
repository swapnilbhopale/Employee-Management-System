import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { IEmployeeList } from '../../Modal/employee';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmployeeList[] = [];
  empServ_ = inject(EmployeeService);
  router = inject(Router);
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empServ_.getAllEmployees().subscribe((res: IEmployeeList[]) => {
      this.employeeList = res;
      // console.log(res);
    });
  }
  removeEmp(id: number) {
    this.empServ_.deleteEmp(id).subscribe((res: any) => {
      if (res) {
        alert('Employee Deleted.');
      }
    });
  }

  onEdit(id: number) {
    this.router.navigateByUrl('edit-employee/' + id);
  }
}
