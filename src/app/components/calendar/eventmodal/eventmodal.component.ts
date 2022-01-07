import { UserService } from './../../../services/user.service';
import { AddmodalComponent, AddformComponent } from './../addmodal/addmodal.component';
import { UtilService } from 'src/app/services/util.service';
import { Scheduling } from './../../../models/Scheduling';
import { Component, Input, OnInit } from '@angular/core';

var selectedScheduling : Scheduling;

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.component.html',
  styleUrls: ['./eventmodal.component.scss']
})
export class EventmodalComponent{
  
  constructor(public dialog: MatDialog) {}

  openDialog(scheduling : Scheduling) {
    selectedScheduling = scheduling;
    const dialogRef = this.dialog.open(EventdetailComponent);
  }
}



import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-eventdetail',
  templateUrl: 'eventdetail.html',
  styleUrls: ['./eventmodal.component.scss']
})
export class EventdetailComponent implements OnInit{

  eventdetailDTO : EventdetailDTO;
  scheduling : Scheduling;

  constructor(alertConfig: NgbAlertConfig) {
    alertConfig.type = 'primary';
    alertConfig.dismissible = false;
  }

  ngOnInit(){
    this.scheduling = selectedScheduling
    this.eventdetailDTO = ConvertEventdetailDto(selectedScheduling);
  }

  isOn(){
    return environment.userOn;
  }
  isThisUserOwner(){
    if(this.isOn())
    {
      //scheduling
      var user = UtilService.ClearString(this.scheduling.RegistrationUser);
      var responsable = UtilService.ClearString(this.scheduling.Responsable);
      var contact = UtilService.ClearString(this.scheduling.ResponsableContact);
      var email = UtilService.ClearString(this.scheduling.ResponsableEmail);
      //logon user
      var logUser = UtilService.ClearString(environment.user.Name);
      var logContact = UtilService.ClearString(environment.user.Contact);
      var logEmail = UtilService.ClearString(environment.user.Email);

      if(user == logUser)
        return true;
      if(responsable == logUser)
        return true;
      if(contact ==  logContact)
        return true;
      if(email == logEmail)
        return true;
    }
    return false;
  }
}

export interface EventdetailDTO
{
  Title?: string | undefined | null
  Place?: string | undefined | null
  Space?: string | undefined | null
  Department?: string | undefined | null
  Responsable?: string | undefined | null
  Contact?: string | undefined | null
  Email?: string | undefined | null
  InitialDate?: string | undefined | null
  FinalDate?: string | undefined | null
  NumberParticipations ?: string | undefined | null
  Observations?: string | undefined | null
}

function ConvertEventdetailDto(tempItem: Scheduling): EventdetailDTO {

  var itemReturn : EventdetailDTO = {
    Title: tempItem.Title.toUpperCase(),
    Place: tempItem.Place,
    Space: tempItem.Space,
    Department: tempItem.Department,
    Responsable: UtilService.NameString(tempItem.Responsable),
    Contact: UtilService.PhoneString(tempItem.ResponsableContact),
    Email: tempItem.ResponsableEmail,
    InitialDate : UtilService.DateString(tempItem.InitialDate),
    FinalDate : UtilService.DateString(tempItem.FinalDate),
    NumberParticipations  : tempItem.NumberParticipations.toString(),
    Observations : tempItem.Observations,
  };
  return itemReturn;
}

