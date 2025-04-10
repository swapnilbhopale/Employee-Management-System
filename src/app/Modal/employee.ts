export class EmpModal {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfJoining: string;
  employeeType: string;
  salary: number;
  departmentId: string;
  designationId: string;
  departmentName: string;
  designationName: string;

  constructor() {
    this.employeeId = 0;
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.gender = '';
    this.dateOfJoining = '';
    this.employeeType = '';
    this.salary = 0;
    this.departmentId = '';
    this.designationId = '';
    this.departmentName = '';
    this.designationName = '';
  }
}

export interface IDepartment {
  departmentId: number;
  departmentName: string;
}

export interface IDesigantion {
  designationId: number;
  departmentId: number;
  designationName: string;
}
