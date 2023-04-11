import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeemasterService {

  //private REST_API_SERVER = 'https://astoriatrainingapi20221122.azurewebsites.net/api/employeemasters';
  private REST_API_SERVER = 'http://localhost/MeghaAPI/api/employeemasters';

  constructor(private httpClient: HttpClient) {}

  public getAllCompanies() {
    return this.httpClient.get("http://localhost/MeghaAPI/api/employeemasters/allcompanies");
  }

  public getAllDesignation() {
    return this.httpClient.get(this.REST_API_SERVER + '/alldesignation');
  }

  public getIsEmployeeIdInUse(EmployeeKey: number): Observable<boolean> {
    console.log("EmployeeKey",EmployeeKey);
    return this.httpClient.get<boolean>(this.REST_API_SERVER +'/IsEmployeeIdInUse?EmployeeKey=' + EmployeeKey);
  }

  public getEmployeeIdExists(
    employeeID: string,
    EmployeeKey: number
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.REST_API_SERVER +
        '/checkEmployeeIdExists?EmployeeID=' +
        employeeID +
        '&EmployeeKey=' +
        EmployeeKey
    );
  }

  public getEmployeeById(EmployeeKey: number) {
    return this.httpClient.get<Employee>(
      this.REST_API_SERVER + '/' + EmployeeKey
    );
  }

  public postEmployee(employeeKey: Employee) {
    return this.httpClient.post(this.REST_API_SERVER, employeeKey);
  }

  public putEmployee(employeeKey: number, employee: Employee) {
    return this.httpClient.put(
      this.REST_API_SERVER + '/' + employeeKey,
      employee
    );
  }

  public DeleteEmployee(employeeKey: number) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + employeeKey);
  }

  public getAllemployees() {
    return this.httpClient.get(this.REST_API_SERVER + '/allemployees');
  }

  public getEmployeeMAster() {
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
