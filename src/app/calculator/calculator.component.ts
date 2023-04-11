import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  initialNum ='0'
  currvalue = ''
  function (value:string){
    this.currvalue= this.currvalue+value
    this.initialNum = this.currvalue
  }

  equal(){
    this.initialNum = eval(this.currvalue)
    this.currvalue = this.initialNum
  }
  clear(){
    this.currvalue = '';
    this.initialNum = '0';
  }

  back(){
    this.currvalue = this.currvalue.slice(0, -1)
    this.initialNum = this.currvalue
  }

}



  // firstNumber : number = 0;
  // secondNumber : number =0;
  // result: string = "";

  // Addnumbers(){
  //   this.result = (Number(this.firstNumber) +Number (this.secondNumber)). toString();
  // }

  // Subnumbers(){
  //   this.result = (Number(this.firstNumber) - Number(this.secondNumber)).toString();
  // }

  // Mulnumbers(){
  //   this.result = (Number(this.firstNumber) * Number(this.secondNumber)).toString();
  // }

  // Divnumbers(){
  //   this.result = (Number(this.firstNumber) / Number(this.secondNumber)).toString();
  // }


