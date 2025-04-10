import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IEmpModal,
  IDepartment,
  IDesigantion,
  IEmployeeList,
} from '../Modal/employee';
import { BASE_URL } from '../environment';
import { Observable } from 'rxjs';
import {
  CREATE_EMP,
  DELETE_EMP,
  DEPT_ID,
  GET_DEPTS,
  GET_DESIGANTION_BY_ID,
  GET_EPMS,
} from '../Constants/varibale-constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = BASE_URL;
  constructor(private http: HttpClient) {}

  createEmployee(obj: IEmpModal): Observable<IEmpModal> {
    return this.http.post<IEmpModal>(this.apiUrl + CREATE_EMP, obj);
  }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl + GET_DEPTS}`);
  }

  getDesignationByDeptId(deptId: number): Observable<IDesigantion[]> {
    return this.http.get<IDesigantion[]>(
      `${this.apiUrl}${GET_DESIGANTION_BY_ID}?${DEPT_ID}=${deptId}`
    );
  }

  getAllEmployees(): Observable<IEmployeeList[]> {
    return this.http.get<IEmployeeList[]>(`${this.apiUrl + GET_EPMS}`);
  }

  deleteEmp(id: number) {
    return this.http.delete(`${this.apiUrl + DELETE_EMP}?id=${id}`);
  }
}
