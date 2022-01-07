import { SchedulingService } from 'src/app/services/scheduling.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from './../../services/user.service';

import { environment } from './../../../environments/environment.prod';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserformComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-createuserform',
  templateUrl: 'createuserform.html',
  styleUrls: ['./create-user.component.scss'],
})

export class CreateUserformComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public error : string = "";
  public user : User = { Name : "", Email : "", Contact : "" };

  constructor(public dialogRef: MatDialogRef<CreateUserformComponent>) {}

  ngOnInit(){}

  createClick() {
    if(this.validation()){
      UserService.set(this.user);
      environment.user = {
        Name : this.user.Name,
        Email : this.user.Email,
        Contact : this.user.Contact  
      };
      environment.userOn = true;
      this.dialogRef.close();
    }
  }
  validation() : boolean {
    var validation = true;

    validation = this.user.Name != null && this.user.Name != undefined && this.user.Name != "";
    if(!validation){
      this.error = " * É necessário informar o nome."
      return validation;
    }

    validation = this.user.Contact != null && this.user.Contact != undefined && this.user.Contact != "";
    if(!validation){
      this.error = " * É necessário informar o contato."
      return validation;
    }

    validation = this.user.Email != null && this.user.Email != undefined && this.user.Email != "";
    if(!validation){
      this.error = " * É necessário informar o e-mail."
      return validation;
    }

    validation = UtilService.ClearString(this.user.Contact).length >= 11;
    if(!validation){
      this.error = " * É necessário informar o contato no formato 11 números ex. (41)99758-7878";
      return validation;
    }

    validation = UserService.getByContact(this.user.Contact) == null;
    if(!validation){
      this.error = " * O contato informado pertence a outro cadastro";
      return validation;
    }

    validation = UserService.getByContact(this.user.Email) == null;
    if(!validation){
      this.error = " * O e-mail informado pertence a outro cadastro";
      return validation;
    }

    return validation;
  }
  getError(){
    return this.error;
  }
}