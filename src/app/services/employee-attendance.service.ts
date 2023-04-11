import { CompanyMaster } from './../models/company-master';

import { Attendance } from './../models/attendance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {

  private REST_API_SERVER = 'http://localhost/MeghaAPI/api';
  //private REST_API_SERVER = 'https://astoriatrainingapi20221122.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  public postEmployee(employeeAtt: Attendance[]):Observable<boolean> {
    console.log("UI data", employeeAtt);
    return this.httpClient.post<boolean>(this.REST_API_SERVER + '/EmployeeAttendances', employeeAtt);
  }

  public getAllCompanies() {
    return this.httpClient.get(this.REST_API_SERVER + '/employeemasters/allcompanies');
    //return this.httpClient.get("http://localhost/MeghaAPI/api/employeemasters/allcompanies");
  }

  public getAllAttendances(clockDate: any, companyId:number): Observable<Attendance[]> {
    return this.httpClient.get<Attendance[]>(this.REST_API_SERVER + '/EmployeeAttendances/allattendance?FilterClockDate=' +clockDate + '&FilterCompanyID=' + companyId);
    //return this.httpClient.get<Attendance[]>("http://localhost/MeghaAPI/api/EmployeeAttendances/allattendance?FilterClockDate=2022-12-09&FilterCompanyID=5");
  }
}
