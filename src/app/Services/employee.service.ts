import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpModal, IDepartment, IDesigantion } from '../Modal/employee';
import { BASE_URL } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = BASE_URL;
  constructor(private http: HttpClient) {}

  createEmployee(obj: EmpModal): Observable<EmpModal> {
    return this.http.post<EmpModal>(this.apiUrl + 'GetEmployees', obj);
  }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl}GetDepartments`);
  }

  getDesignationByDeptId(deptId: number): Observable<IDesigantion[]> {
    return this.http.get<IDesigantion[]>(
      `${this.apiUrl}GetDesignationsByDeptId?deptId=${deptId}`
    );
  }
}
