import { EventmodalComponent, } from './eventmodal/eventmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { ListmodalComponent } from './listmodal/listmodal.component';
import { SchedulingService } from './../../services/scheduling.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput} from '@fullcalendar/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{
  
  constructor(private dialog: MatDialog){}
  ngOnInit(){}

  //#region  CALENDAR OPTIONS
  calendarVisible = true;
  calendarOptions: CalendarOptions = 
  {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    initialView: 'dayGridMonth',
    initialEvents: SchedulingService.getEventInput(), // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };
  //#endregion

  handleDateSelect(selectInfo: DateSelectArg) {
    //open modal list scheduling that day
    var listModal : ListmodalComponent = new ListmodalComponent(this.dialog);   
    var date = selectInfo.startStr;
    if(date != undefined && date != null)
    {
      var day = date?.split("-")[2];
      var month = date?.split("-")[1];
      var year = date?.split("-")[0];

      listModal.openDialog(parseInt(day),parseInt(month),parseInt(year)); 
    }
    //unselect
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  }

  handleEventClick(clickInfo: EventClickArg) {
    //open modal event detail
    var eventDetailModal : EventmodalComponent = new EventmodalComponent(this.dialog);
    var idEvent = + clickInfo.event.id;
    var scheduling = SchedulingService.getById(idEvent);
    eventDetailModal.openDialog(scheduling);
  }
}