import { FormControl, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import {Component,Inject, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pipe, PipeTransform } from '@angular/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface DialogData {
  animal: string;
  name: string;
}


//Table
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})

export class PractiseComponent  {
  String = 'My Name is Megha';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  // animal: string | undefined;
  // name: string | undefined;
  animal!: string;
  name!: string;
  search : String ="";     //for search bar
  public showPassword: boolean = false;    //password

  //MatTable DataSource
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource<any>();


  //Checkboxes
  task: Task = {
        name: 'Indeterminate',
        completed: false,
        color: 'primary',
        subtasks: [
          {name: 'Primary', completed: false, color: 'primary'},
          {name: 'Accent', completed: false, color: 'accent'},
          {name: 'Warn', completed: false, color: 'warn'},
        ],
      };

      allComplete: boolean = false;

      updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
      }

      someComplete(): boolean {
        if (this.task.subtasks == null) {
          return false;
        }
        return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
      }

      setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.task.subtasks == null) {
          return;
        }
        this.task.subtasks.forEach(t => (t.completed = completed));
      }   // Complete CheckBox

      //For sorting
  @ViewChild(MatSort)
   sort: MatSort= new MatSort ;

   //this is a bydefault event called in the runtime
  ngOnInit() {
    this.dataSource.data = ELEMENT_DATA;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.sort = this.sort;
  }

  // openBottomSheet() {
  //   this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  // }


  //DIALOG BOX CONTROL
  constructor(public dialog: MatDialog, private _bottomSheet: MatBottomSheet, ) { }
  price = 123145;
  today = Date;
  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


//FOR PASSWORD CONTROL
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

Identity = new FormControl('',Validators.required);

hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}


// //BottonSheet class
// export class BottomSheetOverviewExampleSheet {
//   constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

//   openLink(event: MouseEvent): void {
//     this._bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
// }

//DialogBox class
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



















