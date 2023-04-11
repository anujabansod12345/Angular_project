
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeemasterService } from '../services/employeemaster.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

fdescribe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],

      imports:  [
        MatDialogModule,
        HttpClientTestingModule,
        MatTableModule,
        HttpClientModule,
        BrowserAnimationsModule
       ],

        providers: [HttpClient,EmployeemasterService, FormBuilder
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('EmployeeID should be in place first', () => {
    expect(component.displayedColumns[0]).toContain("employeeId");
  });

  it('EmployeeName should be in place Second', () => {
    expect(component.displayedColumns[1]).toContain("employeeName");
  });

  it('CompanyName should be in place Third', () => {
    expect(component.displayedColumns[2]).toContain("companyName");
  });

  it('DesignationName should be in place Fourth', () => {
    expect(component.displayedColumns[3]).toContain("designationName");
  });

  it('JoininDate should be in place Fifth', () => {
    expect(component.displayedColumns[4]).toContain("joininDate");
  });

  it('Gender should be in place Sixth', () => {
    expect(component.displayedColumns[5]).toContain("gender");
  });

  it('Dialog should be open when click on the add button ', () => {
    expect(component.openDialog).toBeTruthy();
  });

  it('Dialog should be open when click on the edit button ', () => {
    expect(component.openDialog(12)).toBeTrue;
  });

  it('Employee should be delete when click on the delete button ', () => {
    expect(component.DeleteEmployee(30142)).toBeTrue;
  });

  it('Check total record count', () => {
    const TotalTableRecords = component.dataSource.data.length;
    expect(TotalTableRecords).toBeLessThanOrEqual(21);
  });

});
