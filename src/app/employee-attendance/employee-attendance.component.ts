import { CompanyMaster } from './../models/company-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './../models/employee';
import { Attendance } from './../models/attendance';
import { EmployeeAttendanceService } from './../services/employee-attendance.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent implements OnInit {
  showTable: boolean = false;
  maxDate: any;
  emp: Employee = new Employee();
  allcompany: CompanyMaster[] = [];
  FilterclockDate!: string;
  companyId!: number;
  AttformGroup!: FormGroup;
  buttonDisabled!: boolean;
  AttendanceList: Attendance[] = [];

  timein!: string;
  timeOut!: string;
  remarks!: string;
  invalideData!: string;
  validData: string = '';
  invalideTime!: string;
  employeeId!: string;
  InvalidData = new Array<string>();
  InvalidTime = new Array<string>();
  ValidData = new Array<string>();
  public displayedColumns = [
    'employeeId',
    'employeeName',
    'employeeKey',
    'clockDate',
    'timein',
    'timeout',
    'remarks',
  ];

  public dataSource = new MatTableDataSource<Attendance>();
  //Att: Attendance[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private AttendanceService: EmployeeAttendanceService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buttonDisabled = true;
    this.maxDate = new Date();
    this.getAllCompanies();
    this.AttformGroup = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      Date: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCompanies() {
    this.AttendanceService.getAllCompanies().subscribe((data) => {
      console.log('All companies', data);
      this.allcompany = data as CompanyMaster[];
    });
  }

  public getAllAttendances() {
    this.AttformGroup.markAllAsTouched();
    if (this.AttformGroup.valid) {
      this.showTable = true;

      var fdate = new DatePipe('en-US');
      var FclockDate = fdate.transform(this.FilterclockDate, 'yyyy-MM-dd');
      this.AttendanceService.getAllAttendances(
        FclockDate,
        this.companyId
      ).subscribe((data) => {
        console.log('allAttendance', data);
        this.dataSource = new MatTableDataSource<Attendance>(data);
        this.ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        //console.log(this.Att);
      });
      this.buttonDisabled = false;
    } else {
      Swal.fire({
        title: 'warning',
        text: 'Select company and date.',
        icon: 'warning',
      });
    }
  }

  public saveEmployee() {
    let ListAttendance = new Array<Attendance>();
    this.AttendanceList = this.dataSource.data;
    this.InvalidData = new Array<string>();
    this.InvalidTime = new Array<string>();
    this.ValidData = new Array<string>();
    this.AttendanceList.forEach((item, index) => {
      if (
        (item.timein != '' && item.timeOut == '' && item.remarks == '') ||
        (item.timein == '' && item.timeOut != '' && item.remarks == '') ||
        (item.timein == '' && item.timeOut == '' && item.remarks != '') ||
        (item.timein != '' && item.timeOut != '' && item.remarks == '') ||
        (item.timein == '' && item.timeOut != '' && item.remarks != '') ||
        (item.timein != '' && item.timeOut == '' && item.remarks != '')
      ) {
        this.invalideData = item.employeeId;
        console.log('employeeId', this.employeeId);
        console.log('invaid Data', this.invalideData);
        this.InvalidData.push(this.invalideData);
      } else {
        if (item.timein != '' && item.timeOut != '' && item.remarks != '') {
          if (item.timein > item.timeOut) {
            this.invalideTime = item.employeeId;
            this.InvalidTime.push(this.invalideTime);
          } else {
            this.ValidData.push(item.employeeId);
            let attendance = new Attendance();
            attendance.employeeKey = item.employeeKey;
            attendance.clockDate = item.clockDate;
            attendance.timein = item.clockDate + 'T' + item.timein + ':00';
            attendance.timeOut = item.clockDate + 'T' + item.timeOut + ':00';
            attendance.remarks = item.remarks;
            attendance.creationDate = item.creationDate;
            ListAttendance.push(attendance);
          }
        }
      }
    });
    if (this.ValidData.length == 0) {
      this.CheckValidations();
    } else {
      this.AttendanceService.postEmployee(ListAttendance).subscribe((data) => {
       this.CheckValidations();
        console.log('EmployeeKey', this.ValidData);
        // if (data) {
        // }
      });
    }
    console.log('Employee ID at save', this.employeeId);
  }

  CheckValidations() {
    if (this.InvalidData.length > 0 && this.InvalidTime.length > 0 && this.ValidData.length == 0) {
      Swal.fire({
        title: 'warning',
        text:
          'All fields are mandatory for EmployeeID: ' +
          this.InvalidData +
          ' ' +
          ' Time Out should be greater than timeIn for EmployeeID: ' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (this.InvalidData.length > 0 && this.ValidData.length > 0 && this.InvalidTime.length ==0) {
      Swal.fire({
        title: 'warning',
        text:
          'All fields are mandatory for EmployeeID: ' +
          this.InvalidData +
          ' ' +
          ' Successfully saved data for the employeeID: ' +
          this.ValidData,
        icon: 'warning',
      });
    } else if (this.ValidData.length > 0 && this.InvalidTime.length > 0 && this.InvalidData.length == 0) {
      Swal.fire({
        title: 'warning',
        text:
          'Successfully saved data for the employeeID: ' +
          this.ValidData +
          ' ' +
          ' Time Out should be greater than timeIn for EmployeeID: ' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (
      this.InvalidTime.length > 0 &&
      this.InvalidData.length == 0 &&
      this.ValidData.length == 0
    ) {
      Swal.fire({
        title: 'warning',
        text:
          'Time Out should be greater than timeIn for EmployeeID: ' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (
      this.InvalidData.length > 0 &&
      this.InvalidTime.length == 0 &&
      this.ValidData.length == 0
    ) {
      Swal.fire({
        title: 'warning',
        text: 'All fields are mandatory for EmployeeID: ' + this.InvalidData,
        icon: 'warning',
      });
    } else if (
      this.ValidData.length > 0 &&
      this.InvalidTime.length == 0 &&
      this.InvalidData.length == 0
    ) {
      Swal.fire({
        title: 'Success',
        text: 'Successfully saved data for the employeeID: ' + this.ValidData,
        icon: 'success',
      });
    } else if (
      this.InvalidData.length > 0 &&
      this.InvalidTime.length > 0 &&
      this.ValidData.length > 0
    ) {
      Swal.fire({
        title: 'warning',
        text:
          'All fields are mandatory for EmployeeID: ' +
          this.InvalidData +
          'Time Out should be greater than timeIn for EmployeeID: ' +
          this.InvalidTime +
          'Successfully saved data for the employeeID: ' +
          this.ValidData,
        icon: 'warning',
      });
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
