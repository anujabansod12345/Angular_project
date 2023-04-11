import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeemasterService } from './employeemaster.service';

describe('EmployeemasterService', () => {
  let service: EmployeemasterService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [EmployeemasterService]
    });
    service = TestBed.inject(EmployeemasterService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  // it('Get Companies',()=>{
  //   let GetCompanies: true;
  //   EmployeemasterService
  //   const req = httpController.expectOne('service');
  //   expect (req.request.method).toEqual('GET');
  //   req.flush(true);
  // })

});
