import { DatePipe } from '@angular/common';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartComponentLike, ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public pieChartData: any = [];
  public barChartData: any = [];
  public salaryBarChartData: any = [];
  public xValues: any = [];
  public yValues: any = [];
  public clockDateValues: any = [];
  public workingHoursValues: any = [];
  public salaryClockDateValues: any = [];
  public salaryDataValues: any = [];
  constructor(public DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.pieChart();
    this.barChart();
    this.salaryBarChart();
  }

  pieChart() {

    this.DashboardService.getEmployeeCount().subscribe((data) => {
      this.pieChartData = data;
      console.log('BarchartData1', this.pieChartData);
      new Chart('myChart', {
        plugins: [ChartDataLabels],

        type: 'pie',
        data: {
          labels: [ 'Resigned_Employee', 'Active_Employee'],
          datasets: [
            {
              data: this.pieChartData,
              backgroundColor:['red', 'blue']
            },
          ],
        },
        options:{
          plugins:{
            datalabels:{
              color: 'white'
            }
          }
        }
      });
    });
  }

  barChart() {
    var datePipe = new DatePipe('en-US');
    var barColors = ['yellow'];
    this.DashboardService.getWorkingHours().subscribe((data) => {
      this.barChartData = data;
      console.log('BarchartData', this.barChartData);
      this.barChartData.forEach((c: { clockDate: any; workingHours: any }) => {
        this.clockDateValues.push(
          datePipe.transform(c.clockDate, 'dd-MM-yyyy')
        );
        this.workingHoursValues.push(c.workingHours);
      });
      new Chart('myBarChart', {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
          labels: this.clockDateValues,  //X-axis
          datasets: [                    //Y-axis
            {
              data: this.workingHoursValues,
              backgroundColor: barColors,
              label: 'workingHours',
            },
          ],
        },
        options:{
          plugins:{
            datalabels:{
              color: 'black'
            }
          }
        }
      });
    });
  }

  salaryBarChart() {
    var datePipe = new DatePipe('en-US');
    var barColors = ['purple'];
    this.DashboardService.getEmployeeSalary().subscribe((data) => {
      this.salaryBarChartData = data;
      console.log('Salary Bar Chart', this.salaryBarChartData);
      this.salaryBarChartData.forEach(
        (e: { clockDate: string | number | Date; salary: any }) => {
          this.salaryClockDateValues.push(
            datePipe.transform(e.clockDate, 'dd-MM-yyyy')
          );
          this.salaryDataValues.push(e.salary);
        }
      );
      new Chart('barChart2', {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
          labels: this.salaryClockDateValues,
          datasets: [
            {
              data: this.salaryDataValues,
              label: 'Salary',
              backgroundColor: barColors,
            },
          ],
        },
        options:{
          plugins:{
            datalabels:{
              color: 'white'
            }
          }
        }
      });
    });
  }
}
