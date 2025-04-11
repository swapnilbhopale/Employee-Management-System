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
  departmentName?: string;
  designationName?: string;
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

// export interface IEmpModal {
//   employeeId: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   gender: string;
//   dateOfJoining: string;
//   employeeType: string;
//   salary: number;
//   departmentName: string;
//   designationName: string;
// }
