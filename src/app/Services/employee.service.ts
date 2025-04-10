import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpModal, IDepartment, IDesigantion } from '../Modal/employee';
import { BASE_URL } from '../environment';
import { Observable } from 'rxjs';
import {
  CREATE_EMP,
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

  createEmployee(obj: EmpModal): Observable<EmpModal> {
    return this.http.post<EmpModal>(this.apiUrl + CREATE_EMP, obj);
  }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl + GET_DEPTS}`);
  }

  getDesignationByDeptId(deptId: number): Observable<IDesigantion[]> {
    return this.http.get<IDesigantion[]>(
      `${this.apiUrl}${GET_DESIGANTION_BY_ID}?${DEPT_ID}=${deptId}`
    );
  }

  getAllEmployee() {
    return this.http.get(`${this.apiUrl + GET_EPMS}`);
  }
}
