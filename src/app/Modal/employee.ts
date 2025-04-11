export interface IEmpModal {
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

  // constructor() {
  //   this.employeeId = 0;
  //   this.fullName = '';
  //   this.email = '';
  //   this.phone = '';
  //   this.gender = '';
  //   this.dateOfJoining = '';
  //   this.employeeType = '';
  //   this.salary = 0;
  //   this.departmentId = '';
  //   this.designationId = '';
  // }
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

export interface IEmployeeList {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfJoining: string;
  employeeType: string;
  salary: number;
  departmentName: string;
  designationName: string;
}
