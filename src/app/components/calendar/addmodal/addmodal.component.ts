import { environment } from './../../../../environments/environment.prod';
import { Scheduling} from './../../../models/Scheduling';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addmodal',
  templateUrl: './addmodal.component.html',
  styleUrls: ['./addmodal.component.scss']
})
export class AddmodalComponent {

  constructor(public dialog: MatDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(AddformComponent);
  }
}



import { FormControl, FormGroup } from '@angular/forms';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-addform',
  templateUrl: 'addform.html',
  styleUrls: ['./addmodal.component.scss'],
})
export class AddformComponent implements OnInit{
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  
  public scheduling : Scheduling;
  public error : string = "";
  public userName : string = "";

  constructor(config: NgbTimepickerConfig,
    public dialogRef: MatDialogRef<AddformComponent>) {
    config.seconds = false;
    config.spinners = false;
    config.size = 'small';
  }

  ngOnInit(){
    this.scheduling = this.newObject();
    this.userName = UtilService.NameString(environment.user.Name);
  }
  save() {
    var validation = this.validation();
    if(validation){
      //push on database
      SchedulingService.push(this.scheduling);
      //push on calendar
      //clear object
      this.scheduling = this.newObject();
      this.dialogRef.close();
    }
  }
  alertTest() {
    alert(
      " Active: " + this.scheduling?.Active
      +" | RegistrationDate: " + this.scheduling?.RegistrationDate
      +" | RegistrationUser: " + this.scheduling?.RegistrationUser
      +" | BackgroundColor: " + this.scheduling?.BackgroundColor
      +" | BorderColor: " + this.scheduling?.BorderColor
      +" | TextColor: " + this.scheduling?.TextColor
      +" | Editable: " + this.scheduling?.Editable
      +" | Title: " + this.scheduling?.Title
      +" | AllDay: " + this.scheduling?.AllDay
      +" | InitialDate: " + this.scheduling?.InitialDate
      +" | FinalDate: " + this.scheduling?.FinalDate
      +" | InitialHour: " + this.scheduling?.InitialHour
      +" | FinalHour: " + this.scheduling?.FinalHour
      +" | Department: " + this.scheduling?.Department
      +" | Responsable: " + this.scheduling?.Responsable
      +" | ResponsableContact: " + this.scheduling?.ResponsableContact
      +" | ResponsableEmail: " + this.scheduling?.ResponsableEmail
      +" | Place: " + this.scheduling?.Place
      +" | Space: " + this.scheduling?.Space
      );
  }
  newObject() : Scheduling{
    var object : Scheduling = {
      Active : true,
      RegistrationUser : environment.user.Name,
      RegistrationDate : new Date(),
      BackgroundColor : "blue",
      BorderColor : "black",
      TextColor : "white",
      Title : "Novo agendamento",
      AllDay  : true,
      InitialDate : new Date(),
      FinalDate : new Date(),
      InitialHour :  null,
      FinalHour :  null,
      Department : "Departamento",
      SameUserResponsable : true,
      Responsable : UtilService.NameString(environment.user.Name),
      ResponsableContact : UtilService.PhoneString(environment.user.Contact),
      ResponsableEmail : environment.user.Email,
      Place : "Sede",
      Space : "Local",
      Editable : true,
    };

    return object;
  }
  getError(){
    return this.error;
  }
  validation() : boolean{
    var dataValidation = [];
    dataValidation.push(
      {name: "título" , data: this.scheduling.Title},
      {name: "departamento" , data: this.scheduling.Department},
      {name: "sede" , data: this.scheduling.Place},
      {name: "espaço" , data: this.scheduling.Space},
      {name: "responsável" , data: this.scheduling.Responsable},
      {name: "contato" , data: this.scheduling.ResponsableContact},
      {name: "e-mail" , data: this.scheduling.ResponsableEmail},
      {name: "data inicial" , data: this.scheduling.InitialDate},
      {name: "data final" , data: this.scheduling.FinalDate},
    );

    this.error = "";
    dataValidation.forEach(item => {
      var validation = true;
      validation = item.data != null && item.data != undefined && item.data != "" && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Departamento")) && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Sede")) && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Local")) && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Responsavel")) && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Contato")) && 
      (UtilService.ClearString(item.data) != UtilService.ClearString("Email"));
       
      if(!validation && this.error == "")
        this.error = " * É necessário informar o(a) " + item.name;        
    });

    return this.error == "" ? true : false;
  }
  SameUserResponsable(){
    var isSame = this.scheduling.SameUserResponsable;

    if(isSame){
      this.scheduling.Responsable = UtilService.NameString(environment.user.Name);
      this.scheduling.ResponsableContact = UtilService.PhoneString(environment.user.Contact);
      this.scheduling.ResponsableEmail = environment.user.Email;
    }else{
      this.scheduling.Responsable = "Responsavel";
      this.scheduling.ResponsableContact = "Contato";
      this.scheduling.ResponsableEmail = "Email";
    }
    
    return isSame;
  }
}


