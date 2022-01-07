import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showCalendar(){
    environment.showCalendar = true;
    environment.showChart = false;
  }
  showChart(){
    environment.showCalendar = false;
    environment.showChart = true;
  }
  isOn(){
    return environment.userOn;
  }
}
