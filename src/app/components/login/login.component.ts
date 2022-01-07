import { environment } from './../../../environments/environment.prod';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginformComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: 'loginform.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginformComponent implements OnInit{
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public contact :string = "";
  public error : string = "";

  constructor(public dialogRef: MatDialogRef<LoginformComponent>) {}

  ngOnInit(){}

  loginClick() {
    var findUser = UserService.getByContact(this.contact);
    
    if(findUser != undefined && findUser != null){
      environment.user = {
        Name : findUser.Name,
        Email : findUser.Email,
        Contact : findUser.Contact
      };
      environment.userOn = true;
      this.dialogRef.close();
    }
    else{
      this.error = " * Não foi encontrado o login informado."
    }
  }

  getError(){
    return this.error;
  }
}