import { IDesigantion } from './../../Modal/employee';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IEmpModal, IDepartment } from '../../Modal/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee.service';
import { first, Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { foramteDateToYMD } from '../../Constants/varibale-constants';
import { error } from 'console';

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
  employeeId!: number;

  constructor(
    private empServ_: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.deptList$ = empServ_.getAllDepartments();
    this.activatedRoute.params.subscribe((res: any) => {
      console.log(res);
      this.employeeId = res.id;
      if (this.employeeId != 0) {
        this.getEmployeeById();
      }
    });
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
  getEmployeeById() {
    this.empServ_
      .getEmployeeById(this.employeeId)
      .subscribe((res: IEmpModal) => {
        this.employeeObj = res;
        // console.log(res);
        this.employeeObj.dateOfJoining = foramteDateToYMD(
          this.employeeObj.dateOfJoining
        );
        console.log(this.employeeObj.dateOfJoining);

        this.getDesignation();
      });
  }
  onUpdateEmployee() {
    this.empServ_.updateEmployee(this.employeeObj).subscribe({
      next: (res) => {
        alert('Employee Updated Successfully.');
      },
      error: (err) => {
        alert(err.error.errors.email);
        console.log(err.error.errors);
      },
    });
  }
}
