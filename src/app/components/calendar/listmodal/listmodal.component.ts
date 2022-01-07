import { UtilService } from './../../../services/util.service';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

var selectDay : number | undefined | null = 0;
var selectMonth : number | undefined | null = 0;
var selectYear : number | undefined | null = 0;

@Component({
  selector: 'app-listmodal',
  templateUrl: './listmodal.component.html',
  styleUrls: ['./listmodal.component.scss']
})
export class ListmodalComponent{

  constructor(public dialog: MatDialog) {}

  openDialog(day : number, month : number, year : number) {
    selectDay = day;
    selectMonth = month;
    selectYear = year;

    const dialogRef = this.dialog.open(ListformComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAll() {
    selectDay = 0;
    selectMonth = 0;
    selectYear = 0;
    const dialogRef = this.dialog.open(ListformComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



import { FormControl, FormGroup } from '@angular/forms';
import { Scheduling } from 'src/app/models/Scheduling';

@Component({
  selector: 'app-listform',
  templateUrl: 'listform.html',
  styleUrls: ['./listmodal.component.scss']
})
export class ListformComponent{// implements OnInit{
    
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  listScheduling : ListDto[];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(){
    this.refresh();
  }
  
  refresh() {
    if(selectDay != 0 && selectMonth != 0 && selectYear != 0)
      var tempList = SchedulingService.getByDate(selectDay, selectMonth, selectYear);
    else
      var tempList = SchedulingService.get();

    this.listScheduling = ConvertListDto(tempList)
      .map((scheduling, i) => ({id: i + 1, ...scheduling}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.collectionSize = this.listScheduling.length;
  }

  // ngOnInit(){
  //   if(selectDay != 0 && selectMonth != 0 && selectYear != 0)
  //     var tempList = SchedulingService.getByDate(selectDay, selectMonth, selectYear);
  //   else
  //     var tempList = SchedulingService.get();

  //   if(tempList.length > 0){
  //     this.listScheduling = ConvertListDto(tempList)
  //       .map((scheduling, i) => ({id: i + 1, ...scheduling}))
  //       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  //     this.collectionSize = this.listScheduling.length;
  //   }
  // }
}

export interface ListDto{
  Title : string,
  Department : string,
  Responsable : string,
  InitialDate : string,
  FinalDate : string,
  Contact: string
}

function ConvertListDto(tempList: Scheduling[]): ListDto[] {
  var listReturn : ListDto [] = [];

  tempList.forEach(item => {
    listReturn.push({
      Title:item.Title,
      Department:item.Department,
      Responsable:UtilService.NameString(item.Responsable),
      InitialDate:UtilService.DateString(item.InitialDate),
      FinalDate:UtilService.DateString(item.FinalDate),
      Contact:UtilService.PhoneString(item.ResponsableContact)
    });
  });

  return listReturn;
}

