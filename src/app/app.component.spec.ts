import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormBuilder } from '@angular/forms';
import { EmployeeAttendanceService } from './services/employee-attendance.service';

import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
describe('AppComponent', () => {
  let comp: AppComponent;
  let ComponentFixture: ComponentFixture<AppComponent>;
  let ele: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],

      imports:  [HttpClientTestingModule, MatFormFieldModule, MatInputModule,
      MatFormFieldModule,   MatInputModule, MatFormFieldModule,
      BrowserAnimationsModule, MatDialogModule, MatSidenavModule, RouterModule,
      MatIconModule, MatListModule, MatToolbarModule, ActivatedRoute, Router ],

      providers: [
        EmployeeAttendanceService, FormBuilder
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Astoria Training App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Astoria Training App');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('MyCalculatorApp app is running!');
  });

  // it(`should have as title as 'Astoria Training- Attendance System'`, ()=>{

  // })
});
