import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent{

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(LogoutformComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-logoutform',
  templateUrl: 'logoutform.html',
  styleUrls: ['./logout.component.scss'],
})

export class LogoutformComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public user : User;

  constructor(public dialogRef: MatDialogRef<LogoutformComponent>) {}

  ngOnInit(){
    this.user = environment.user;
  }

  logoutClick() {
    environment.user = {
      Name:"",
      Email:"",
      Contact:""
    }
    environment.userOn = false;
    this.dialogRef.close();
  }
  
}