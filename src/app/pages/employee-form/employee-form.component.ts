import { IDesigantion } from './../../Modal/employee';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IEmpModal, IDepartment } from '../../Modal/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee.service';
import { first, Observable, take } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  // empForm!: FormGroup;
  temp = [];
  employeeObj: IEmpModal = new IEmpModal();
  deptList$: Observable<IDepartment[]> = new Observable<IDepartment[]>();
  designationList: IDesigantion[] = [];

  constructor(private empServ_: EmployeeService) {
    this.deptList$ = empServ_.getAllDepartments();
  }
  onSaveEmployee() {
    // debugger;
    this.empServ_.createEmployee(this.employeeObj).subscribe(
      (res: IEmpModal) => {
        alert('Employee Created Successfully.');
      },
      (error) => {
        alert('API Error' + error.error);
      }
    );
  }
  getDesignation() {
    this.empServ_
      .getDesignationByDeptId(+this.employeeObj.departmentId)
      .subscribe((res: IDesigantion[]) => {
        this.designationList = res;
      });
  }
}
