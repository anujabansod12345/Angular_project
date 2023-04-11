import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { PractiseComponent } from './practise/practise.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { EmployeeMasterDialogComponent } from './employee-master-dialog/employee-master-dialog.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'calculator', component: CalculatorComponent },
  { path: 'practise', component: PractiseComponent },
  { path: 'employeedetails', component: EmployeeDetailsComponent },
  { path: 'employeeattendance', component: EmployeeAttendanceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employeemasterdialog', component: EmployeeMasterDialogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
