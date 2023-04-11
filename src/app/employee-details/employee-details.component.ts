import { Employee } from './../models/employee';
import { EmployeeMasterDialogComponent } from './../employee-master-dialog/employee-master-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeemasterService } from '../services/employeemaster.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  public displayedColumns = [
    'employeeId',
    'employeeName',
    'companyName',
    'designationName',
    'joininDate',
    'gender',
    'Update',
    'Delete',
  ];
  public dataSource = new MatTableDataSource<Employee>();

  allemployee: Employee[] = [];
  emp: Employee = new Employee();
  employeeKey!: number;
  IsEmployeeIdInUse!: Boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeemasterService
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllEmployees() {
    this.employeeService.getAllemployees().subscribe((data) => {
      this.dataSource.data = data as Employee[];
    });
  }

  openDialog(Employeekey: number){

    let dialogConfig = {
      data: Employeekey,
    };
    const dialogRef = this.dialog.open(
      EmployeeMasterDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
    this.getAllEmployees();
    });
  }

  DeleteEmployee(employeeKey: number) {
    this.employeeService.getIsEmployeeIdInUse(employeeKey).subscribe((data) => {
      this.IsEmployeeIdInUse = data as boolean;
      if (this.IsEmployeeIdInUse == true) {
        Swal.fire({
          title: 'Alert',
          icon: 'warning',
          text: 'Employee ID is in use. can not be delete.',
        });
      } else {
        Swal.fire({
          title: 'Are you sure to do delete this employee permanently.',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.employeeService
              .DeleteEmployee(employeeKey)
              .subscribe((data) => {
                this.getAllEmployees();
                Swal.fire({
                  text: 'Employee is deleted successfully.',
                });
              });
          }
          else if(result.isDenied)
          {

          }
        });
      }
    });
  }
}
