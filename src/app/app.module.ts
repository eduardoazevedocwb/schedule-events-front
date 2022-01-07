import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modal
import { MatDialogModule } from '@angular/material/dialog';
import { AddmodalComponent, AddformComponent} from './components/calendar/addmodal/addmodal.component';
import { ListmodalComponent, ListformComponent } from './components/calendar/listmodal/listmodal.component';
//date
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
//time
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventdetailComponent, EventmodalComponent } from './components/calendar/eventmodal/eventmodal.component';
//event detail card
import {MatCardModule} from '@angular/material/card';
//structure
import { TopComponent } from './components/top/top.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
//charts
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsComponent } from './components/charts/charts.component';
//progress bar
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CreateUserComponent, CreateUserformComponent } from './components/create-user/create-user.component';
//login form
import { LoginComponent, LoginformComponent } from './components/login/login.component';
//logout form
import { LogoutComponent, LogoutformComponent } from './components/logout/logout.component';

import { EditmodalComponent, EditformComponent } from './components/calendar/editmodal/editmodal.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddmodalComponent,
    AddformComponent,
    ListmodalComponent,
    ListformComponent,
    EventmodalComponent,
    EventdetailComponent,
    TopComponent,
    FooterComponent,
    BodyComponent,
    ChartsComponent,
    CreateUserComponent,
    LoginComponent,
    LoginformComponent,
    CreateUserformComponent,
    LogoutComponent,
    LogoutformComponent,
    EditmodalComponent,
    EditformComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    //modal
    MatDialogModule,
    //date
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,MatNativeDateModule,
    NgbModule,
    //event detail card
    MatCardModule,
    //charts
    NgApexchartsModule,
    //progress bar
    MatProgressBarModule,

  ],
  //modals
  exports: [
    AddformComponent, 
    ListformComponent, 
    EventdetailComponent, 
    LoginformComponent, 
    CreateUserformComponent,
    LogoutformComponent,
    EditformComponent,
  ],
  entryComponents: [
    AddformComponent, 
    ListformComponent, 
    EventdetailComponent, 
    LoginformComponent, 
    CreateUserformComponent,
    LogoutformComponent,
    EditformComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent,],
})
export class AppModule { }
