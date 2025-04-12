import { Component, inject, input, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { IEmpModal } from '../../Modal/employee';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SOERT_TYPE } from '../../Constants/enum';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmpModal[] = [];
  originalEmployeeList: IEmpModal[] = [];
  sort_type = SOERT_TYPE;
  view = SOERT_TYPE.LIST_VIEW;
  empServ_ = inject(EmployeeService);
  router = inject(Router);
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empServ_.getAllEmployees().subscribe((res: IEmpModal[]) => {
      this.employeeList = res;
      this.originalEmployeeList = res;
    });
  }
  removeEmp(id: number) {
    this.empServ_.deleteEmp(id).subscribe((res: any) => {
      confirm('Are Sure you want to Delete this Record?');
      if (res) {
        alert('Employee Deleted.');
        this.getAllEmployees();
      }
    });
  }

  onEdit(id: number) {
    this.router.navigateByUrl('edit-employee/' + id);
  }
  sort(view: any) {
    this.view = view;
    if (view == this.sort_type.LIST_VIEW) {
      this.getAllEmployees();
    } else if (view == this.sort_type.DES_VIEW) {
      this.employeeList = this.employeeList.sort(
        (a: IEmpModal, b: IEmpModal) => a.salary - b.salary
      );
    } else if (view == this.sort_type.ASC_VIEW) {
      this.employeeList = this.employeeList.sort(
        (a: IEmpModal, b: IEmpModal) => b.salary - a.salary
      );
    }
  }
  searchByName(event: KeyboardEvent) {
    const inputVal = (event.target as HTMLInputElement).value.toLowerCase();

    if (!inputVal) {
      this.employeeList = this.originalEmployeeList;
    } else {
      this.employeeList = this.originalEmployeeList.filter(
        (val) =>
          val.fullName.toLowerCase().includes(inputVal) ||
          val.email.toLowerCase().includes(inputVal) ||
          val.phone.includes(inputVal)
      );
    }
  }
}
