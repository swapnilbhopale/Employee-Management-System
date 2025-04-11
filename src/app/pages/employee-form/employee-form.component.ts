import { IDesigantion } from './../../Modal/employee';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IEmpModal, IDepartment } from '../../Modal/employee';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { foramteDateToYMD } from '../../Constants/varibale-constants';
import { error } from 'console';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  designationList: IDesigantion[] = [];
  tempEmpId!: number;
  deptList: IDepartment[] = [];
  constructor(
    private empServ_: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.intializeForm();
    this.getIdFromUrl();
    this.getDeptList();
  }

  intializeForm(formVal?: IEmpModal) {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(formVal ? formVal.employeeId : 0, [
        Validators.required,
      ]),
      fullName: new FormControl(formVal ? formVal.fullName : '', []),
      email: new FormControl(formVal ? formVal.email : '', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(formVal ? formVal.phone : '', [
        Validators.required,
        Validators.minLength(10),
      ]),
      gender: new FormControl(formVal ? formVal.gender : '', [
        Validators.required,
      ]),
      dateOfJoining: new FormControl(formVal ? formVal.dateOfJoining : '', [
        Validators.required,
      ]),
      employeeType: new FormControl(formVal ? formVal.employeeType : '', [
        Validators.required,
      ]),
      salary: new FormControl(formVal ? formVal.salary : '', [
        Validators.required,
      ]),
      departmentId: new FormControl(formVal ? formVal.departmentId : '', [
        Validators.required,
      ]),
      designationId: new FormControl(
        { value: formVal ? formVal.designationId : '', disabled: true },
        [Validators.required]
      ),
    });
  }
  onSaveEmployee() {
    const formValue = this.employeeForm.value;
    this.empServ_.createEmployee(formValue).subscribe({
      next: (res: IEmpModal) => {
        alert('Employee Created Successfully.');
        this.intializeForm();
      },
      error: (error) => alert('API Error' + error.error),
    });
  }
  getDeptList() {
    this.empServ_.getAllDepartments().subscribe((res: IDepartment[]) => {
      this.deptList = res;
    });
  }
  getDesignation(id?: any) {
    // const departmentId = event.target.value;
    const departmentId = this.employeeForm.get('departmentId')?.value | id;

    if (!departmentId) {
      this.employeeForm.get('designationId')?.disable();
    } else {
      this.employeeForm.get('designationId')?.enable();
      this.empServ_
        .getDesignationByDeptId(departmentId)
        .subscribe((res: IDesigantion[]) => {
          this.designationList = res;
        });
    }
  }

  getIdFromUrl() {
    const isEdit = this.router.url;
    if (isEdit.includes('edit')) {
      this.activatedRoute.params.subscribe((res: any) => {
        this.tempEmpId = res.id;
        if (this.tempEmpId != 0) {
          this.getEmployeeById();
        }
      });
    }
  }
  getEmployeeById() {
    this.empServ_
      .getEmployeeById(this.tempEmpId)
      .subscribe((res: IEmpModal) => {
        this.intializeForm(res);

        this.employeeForm.patchValue({
          dateOfJoining: foramteDateToYMD(res.dateOfJoining),
        });
        this.getDesignation(res.departmentId);
      });
  }
  onUpdateEmployee() {
    const formVal = this.employeeForm.value;
    this.empServ_.updateEmployee(formVal).subscribe({
      next: (res) => {
        alert('Employee Updated Successfully.');
        this.intializeForm();
      },
      error: (err) => {
        alert(err.error.errors.email);
      },
    });
  }
}
