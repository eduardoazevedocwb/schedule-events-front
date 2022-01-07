import { UtilService } from 'src/app/services/util.service';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showCalendar(){ return environment.showCalendar; }
  showChart(){ return environment.showChart; }

  getNumParticipations() : string{
    return SchedulingService.getNumParticipations().toString();
  }
  getNumScheduling():string{
    return SchedulingService.getNumScheduling().toString();
  }
  getAveragePartic():string{
    return SchedulingService.getAverageParticipations().toString();
  }
  getAverageScheduling(){
    return SchedulingService.getAverageScheduling().toString();
  }
  isOn(){
    return environment.userOn;
  }
  getUser(){
    return UtilService.NameString(environment.user.Name);
  }
}
