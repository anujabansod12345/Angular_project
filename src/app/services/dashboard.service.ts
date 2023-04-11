import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //private REST_API_SERVER = 'https://astoriatrainingapi20221122.azurewebsites.net/api';
  private REST_API_SERVER = 'https://localhost/MeghaAPI/api';

  constructor(private httpClient: HttpClient) { }


  public getEmployeeCount() {
    return this.httpClient.get(this.REST_API_SERVER + '/Dashboard/EmployeeCount');
  }

  public getWorkingHours() {
    return this.httpClient.get(this.REST_API_SERVER + '/Dashboard/workingHourPerDay');
  }

  public getEmployeeSalary() {
    return this.httpClient.get(this.REST_API_SERVER + '/Dashboard/EmployeeSalary');
  }

}
