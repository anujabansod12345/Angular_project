import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmployeemasterService } from './../services/employeemaster.service';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeMasterDialogComponent } from './employee-master-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

fdescribe('EmployeeMasterDialogComponent', () => {
  let component: EmployeeMasterDialogComponent;
  let fixture: ComponentFixture<EmployeeMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeMasterDialogComponent],

      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        EmployeemasterService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be valid when all the data is correct', () => {

    component.form.controls['firstName'].setValue('Priya');
    component.form.controls['lastName'].setValue('Dehariya');
    component.form.controls['employeeId'].setValue('ATIL-102');
    component.form.controls['companyName'].setValue('Astoria Middle East');
    component.form.controls['Gender'].setValue('F');
    component.form.controls['designationId'].setValue('4');
    component.form.controls['ResignationDate'].setValue('2022-10-02');
    component.form.controls['joiningDate'].setValue('2020-01-02');
    component.form.controls['salaryRate'].setValue('25.500');
    expect(component.form.valid).toBeTruthy();
  });

  it('Form should be Invalid when all the fields are empty', () => {
    component.form.controls['firstName'].setValue('');
    component.form.controls['employeeId'].setValue('');
    component.form.controls['companyName'].setValue('');
    component.form.controls['Gender'].setValue('');
    component.form.controls['designationId'].setValue('');
    component.form.controls['ResignationDate'].setValue('');
    component.form.controls['joiningDate'].setValue('');
    component.form.controls['salaryRate'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('Form should be Invalid when any field have missing data', () => {
    component.form.controls['firstName'].setValue('Priya');
    component.form.controls['lastName'].setValue('Dehariya');
    component.form.controls['employeeId'].setValue('');
    component.form.controls['companyName'].setValue('Astoria Middle East');
    component.form.controls['Gender'].setValue('F');
    component.form.controls['designationId'].setValue('4');
    component.form.controls['ResignationDate'].setValue('2022-10-02');
    component.form.controls['joiningDate'].setValue('2020-01-02');
    component.form.controls['salaryRate'].setValue('25.500');
    expect(component.form.valid).toBeFalsy();
  });

  it('Form should be Invalid when any field have Invalid data', () => {
    component.form.controls['firstName'].setValue('12345678');
    component.form.controls['lastName'].setValue('Dehariya');
    component.form.controls['employeeId'].setValue('ATIL-102');
    component.form.controls['companyName'].setValue('Astoria Middle East');
    component.form.controls['Gender'].setValue('F');
    component.form.controls['designationId'].setValue('4');
    component.form.controls['ResignationDate'].setValue('2021-10-02');
    component.form.controls['joiningDate'].setValue('2022-01-02');
    component.form.controls['salaryRate'].setValue('25.500');
    expect(component.form.valid).toBeFalse();
  });

  it('firstName should not more than 30 characters', () => {
    component.form.controls['firstName'].setValue('Priyaasdfghjklxcvbnm,qwertyuiopsdfghjklzxcvbnm,asdfghjklwertyuiop');
    expect(component.form.controls['firstName'].valid).toBeFalsy();
  });

  it('firstName should be invalid when we providing special character in that', () => {
    component.form.controls['firstName'].setValue('@#$%^&*');
    expect(component.form.controls['firstName'].valid).toBeFalsy();
  });

  it('LastName should not more than 30 characters', () => {
    component.form.controls['lastName'].setValue('Priyaasdfghjklxcvbnm,qwertyuiopsdfghjklzxcvbnm,asdfghjklwertyuiop');
    expect(component.form.controls['lastName'].valid).toBeFalsy();
  });

  it('EmployeeId should be Invalid when length is more', () => {
    component.form.controls['employeeId'].setValue('ATIL-18777777777777777777777');
    expect(component.form.controls['employeeId'].valid).toBeFalse();
  });

  it('salaryRate should not be character', () => {
    component.form.controls['salaryRate'].setValue('qwertyuiop');
    expect(component.form.controls['salaryRate'].valid).toBeFalse();
  });

  it('Gender should not be Number', () => {
    component.form.controls['Gender'].setValue('123456781234567qwertyuioqwertyuioqwertyuiwertyuiqwertyui');
    expect(component.form.controls['Gender'].valid).toBeFalsy();
  });
});
