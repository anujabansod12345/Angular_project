import { Employee } from './../models/employee';
import { CompanyMaster } from './../models/company-master';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { EmployeemasterService } from '../services/employeemaster.service';
import { DesignationMaster } from '../models/designation-master';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}

@Component({
  selector: 'app-employee-master-dialog',
  templateUrl: './employee-master-dialog.component.html',
  styleUrls: ['./employee-master-dialog.component.css'],
})
export class EmployeeMasterDialogComponent implements OnInit {
  title = '';
  allcompany!: CompanyMaster[];
  allDesignation!: DesignationMaster[];
  emp: Employee = new Employee(); //Employee is a object

  Showsave!: boolean;
  ShowUpdate!: boolean;
  ShowDelete!: boolean;
  ShowResignationDate!: boolean;
  EmpKey!: number;
  form!: FormGroup;
  employeeId = new FormControl('', [Validators.required, Validators.email]);
  employeeKey!: number;
  isEmployeeIdExists!: Boolean;
  orgJoiningDate!: Date;
  orgResignationDate!: Date;
  datepipe: any;

  constructor(
    private formBuilder: FormBuilder,
    private EmployeeService: EmployeemasterService,
    private dialogRef: MatDialogRef<EmployeeMasterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) empKey: number
  ) {
    this.employeeKey = empKey;
    if (empKey == 0) {
      this.title = 'Add Employee';
      this.Showsave = true;
      this.ShowUpdate = false;
      this.ShowDelete = true;
      this.ShowResignationDate = true;
    } else {
      this.title = 'Edit Employee';
      this.getEmployeeByEmployeeKey(empKey);
      this.Showsave = false;
      this.ShowUpdate = true;
      this.ShowDelete = true;
      this.ShowResignationDate = false;
      console.log(this.emp);
    }
  }

  ngOnInit() {
    this.getAllCompanies();
    this.getAllDesignation();
    this.getEmployeeByEmployeeKey(this.EmpKey);

    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      employeeId: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('[a-zA-Z0-9-  ]*'),
      ]),
      companyName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      Gender: new FormControl('', [Validators.required]),
      designationId: new FormControl('', [Validators.required]),
      ResignationDate: new FormControl(''),
      joiningDate: new FormControl('', [Validators.required]),
      salaryRate: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[0-9.]*'),
      ]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  getEmployeeByEmployeeKey(empKey: number) {
    this.EmployeeService.getEmployeeById(empKey).subscribe((data) => {
      this.emp = data as Employee;
      this.orgJoiningDate = this.emp.empJoiningDate;
      this.orgResignationDate = this.emp.empResignationDate;
    });
  }

  getAllCompanies() {
    this.EmployeeService.getAllCompanies().subscribe((data) => {
      this.allcompany = data as CompanyMaster[];
    });
  }

  getAllDesignation() {
    this.EmployeeService.getAllDesignation().subscribe((data) => {
      this.allDesignation = data as DesignationMaster[];
    });
  }

  saveEmployee() {
    if(this.form.valid){
    }
    this.form.markAllAsTouched();
    this.EmployeeService.getEmployeeIdExists(
      this.emp.employeeId,
      this.employeeKey
    ).subscribe((data) => {
      this.isEmployeeIdExists = data as boolean;

      if (this.isEmployeeIdExists == false) {
        this.emp.joininDate = new Date(this.emp.joininDate);
        this.emp.empJoiningDate.setHours(
          this.emp.empJoiningDate.getHours() + 5
        );
        this.emp.empJoiningDate.setMinutes(
          this.emp.empJoiningDate.getMinutes() + 30
        );
        this.EmployeeService.postEmployee(this.emp).subscribe(() => {
          Swal.fire({
            icon: 'success',
            text: 'Employee is created successfully.',
          });
          this.dialogRef.close();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'EmployeeID is already exist.',
        });
      }
    });
  }
  // else{
  //   Swal.fire({
  //     icon: 'warning',
  //     text: 'Only alphabets allowed',
  //   });
  // }
  //}

  updateEmployee() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.emp.empJoiningDate = new Date(this.emp.empJoiningDate);
    this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours() + 5);
    this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes() + 30);

    if (
      this.emp.empJoiningDate != null &&
      this.emp.empResignationDate != null
    ) {
      if (
        new Date(this.emp.empJoiningDate) >
        new Date(this.emp.empResignationDate)
      ) {
        Swal.fire({
          title: 'warning',
          text: 'Resignation date should be greater than joining date.',
          icon: 'warning',
        });
        return;
      }
    }
    this.EmployeeService.getEmployeeIdExists(
      this.emp.employeeId,
      this.employeeKey
    ).subscribe((data) => {
      this.isEmployeeIdExists = data as boolean;

      if (this.isEmployeeIdExists == false) {
        this.EmployeeService.putEmployee(
          this.emp.employeeKey,
          this.emp
        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            text: 'Employee is updated successfully.',
          });
          this.dialogRef.close();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'EmployeeID is already exist.',
        });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}







//   this.EmployeeService.getEmployeeIdExists(this.emp.employeeId, this.employeeKey).subscribe((data)=>{
//   this.isEmployeeIdExists = data as boolean;
//   if(this.orgJoiningDate!=this.emp.empJoiningDate)
//   {
//     this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours() + 5);
//     this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes() + 30);
//   }
//   if(this.emp.empResignationDate!=null && this.orgResignationDate!= this.emp.empResignationDate)
//   {
//     this.emp.empResignationDate.setHours(this.emp.empResignationDate.getHours() + 5);
//     this.emp.empResignationDate.setMinutes(this.emp.empResignationDate.getMinutes() + 30);
//   }
//   if(this.emp.empResignationDate!=null)
//   {
//     let joiningDate = this.datepipe.transform(this.emp.empJoiningDate, 'yyyy-MM-dd');
//     let ResigDate = this.datepipe.transform(this.emp.empResignationDate, 'yyyy-MM-dd');

//     if (joiningDate!>ResigDate!){
//       Swal.fire({
//         title: 'Alert',
//         text: 'Joining date must be greater than resignation date.',
//         icon: 'warning',
//       });
//       return
//     }
//   }
//   this.EmployeeService.putEmployee(this.employeeKey, this.emp).subscribe((data)=>{
//     Swal.fire({
//       icon: 'success', text: 'Employee is updated successfully.'
//     });
//     this.dialogRef.close();
//   });
// }
// else{
//   Swal.fire({
//     title: 'alert',
//     text: 'Employee ID is already exist',
//   }),
// }
// });
// }
