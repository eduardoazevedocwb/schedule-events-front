import { UtilService } from 'src/app/services/util.service';
import { Scheduling } from './../models/Scheduling';
import { EventInput, EventApi } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { scheduled } from 'rxjs';
import { DatePipe } from '@angular/common';

var dbScheduling: Scheduling [] = [];

@Injectable({
  providedIn: 'root'
})

export class SchedulingService {
  //baseUrl = "https://localhost:44364/api/";
  
  constructor(private http: HttpClient) {
    createDbScheduling();
  } 
  
  static get () : Scheduling[] {
    return dbScheduling;
  }
  static getById (id : number) : Scheduling {
    return dbScheduling.find(a=> a.Id == id);
  }
  static getByDate (day : number = 0, month : number = 0, year : number = 0) : Scheduling[]{
    var tempList = createDbScheduling();
    var newList : Scheduling[] = [];
    var selectedDate = new Date(year,month - 1,day);
    tempList.forEach(item => {
      var initialDate = new Date( item.InitialDate.getFullYear(),
                                  item.InitialDate.getMonth(),
                                  item.InitialDate.getDate());
      var finalDate = new Date( item.FinalDate.getFullYear(),
                                  item.FinalDate.getMonth(),
                                  item.FinalDate.getDate());
                                  
    if(initialDate <= selectedDate && finalDate >= selectedDate)
        newList.push(item);
    });
    return newList;
  }

  static getEventInput (): EventInput[] {   
    var tempList = createDbScheduling();
    var listEvents = convertToEventInput(tempList);    
    return listEvents;
  }
  static push (scheduling : Scheduling){
    pushDbScheduling(scheduling);
  }


  static getNumParticipations() : number {
    if(DbIsNull())
      return 0;

    var result = 0;
    dbScheduling.forEach(item => {
      if(item.NumberParticipations != null && item.NumberParticipations != undefined)
        result += item.NumberParticipations;
    });  
    return result;
  }
  static getNumScheduling() : number{
    if(DbIsNull())
      return 0;

    return dbScheduling.length;
  }
  static getAverageScheduling() : number {
    if(DbIsNull())
      return 0;

    var numScheduling = this.getNumScheduling();
    return Math.round(numScheduling/12);
  }
  static getAverageParticipations() :number {
    if(DbIsNull())
      return 0;

    var numParticipations = this.getNumParticipations();
    return Math.round(numParticipations/12);
  }


  static getParticPerMonth() : Map<number,number>{
    var listReturn = UtilService.EmptyMonthDictionary();

    if(DbIsNull())
      return listReturn;

    dbScheduling.forEach(item => {
      var month = item.InitialDate?.getMonth() + 1;
      var value = listReturn.get(month);
      listReturn.set(month, value += item.NumberParticipations);
    });

    return listReturn;
  }
  static getParticBestEvent() : any[] {
    var listReturn = []; // key = title event | value = number of participations
    var maxShow = 7; // number of results (ex. 7 first biggest number os participations)

    if(DbIsNull())
      return listReturn;

    var orderList = dbScheduling.sort((a,b) => b.NumberParticipations - a.NumberParticipations);

    for(let i = 0; i < maxShow ; i ++)
    {
      var event = orderList[i];
      listReturn.push(
        {key:event.Title,value:event.NumberParticipations}
      );
    }

    return listReturn;
  }
  static getSpaceBestUse() : any[]{
    var listReturn = []; // key = title space | value = number day used
    var maxShow = 7; // number of results (ex. 7 first most used)

    if(DbIsNull())
      return listReturn;

    var list = this.orderSpaceDayUse();
    var orderList = list.sort((a,b) => b.value - a.value);

    for(let i = 0; i < maxShow && i < list.length ; i ++)
    {
      var event = orderList[i];
      if(event != null && event != undefined){
        listReturn.push(
          { key: event.key , value: event.value } 
        );
      }
    }

    return listReturn;
  }
  static orderSpaceDayUse() {
    var list = []; // put together the same space | sum the number day used

    dbScheduling.forEach(item => {
      
      if(item.Space != null && item.Space != undefined){
        var contains = list.some(a=> a.key == item.Space);
        var countDay = UtilService.CountDays(item.InitialDate,item.FinalDate);
        
        if(contains)
          list.find(a=> a.key == item.Space).value += countDay;
        else
          list.push({ 
            key: item.Space,
            value: countDay 
            });
      }
    });
    return list;
  }
  static getSpaceUsePerMonth() : any[]{
    var listReturn = []; // space = title space | month | value = day used per month
    var maxShow = 7; // number of results (ex. 7 first space most used)

    if(DbIsNull())
      return listReturn;

    var list = this.orderSpaceUsePerMonth();

    list.forEach(result => {
      if(result != null && result != undefined){
        listReturn.push(
          { space: result.space , month : result.month, value: result.value } 
        );
      }
    });

    return listReturn;
  }
  static orderSpaceUsePerMonth() {
    // space = title space | month | value = day used per month
    var list = []; // put together the same space | sum the number day used per month

    dbScheduling.forEach(item => {
      
      if(item.Space != null && item.Space != undefined){
        var month = item.InitialDate.getMonth() + 1;
        var contains = list.some(a=> a.space == item.Space && a.month == month);
        var countDay = UtilService.CountDays(item.InitialDate,item.FinalDate);
        
        if(contains)
          list.find(a=> a.space == item.Space && a.month == month).value += countDay;
        else
          list.push(
            { space: item.Space, month : month , value: countDay } 
        );
      }
    });
    return list;
  }
}


function createDbScheduling() : Scheduling []{
  var color : string [] = ["#B23CFD","#00B74A","#F93154","#FFA900","#39C0ED"]
  var spaces : string [] = ["Salão principal","Salão principal","Salão principal","Salão principal", 
  "Salão 02", "Salão 02","Salão 02","Salão 02","Salão 02",
  "Salão superior", "Sala de aula 01", "Sala de artes", "Sala de musica"]
  var countColor : number = 0;
  var countMonth : number = 1;
  var countSpaces : number = 0;
  var trueFalse = false;

  dbScheduling = [];

  for(let i = 1 ; i <= 47 ; i++){

    var day = i >= 28 ? 28 : i;

    var date1 = new Date(2021,countMonth-1, day);
    var date2 = new Date(2021,countMonth-1, day);
    date2.setDate(date2.getDate() + 10);


    dbScheduling.push({
      Id: i,
      Active: true,
      RegistrationDate: new Date(),
      RegistrationUser: "Eduardo F Azevedo",
      BackgroundColor: color[countColor],
      BorderColor: color[countColor],
      TextColor: "White",
      Editable: true,
      Title: "Event simulator",
      AllDay : true,
      InitialDate: date1,
      FinalDate: date2,
      Department: "Cultural",
      Responsable: "Fernanda C Ferreira",
      ResponsableContact: "41999998888",
      ResponsableEmail: "email@email.com",
      Place: "Concordia",
      Space: spaces[countSpaces],
      NumberParticipations: i
    });
    
    if(trueFalse){
      countMonth ++;
      if(countMonth == 13)
        countMonth = 1;

      countSpaces ++
      if(countSpaces >= 13)
        countSpaces = 0;

      trueFalse = false;
    }else{trueFalse = true;}

    countColor ++;
    if(countColor == 5)
      countColor = 0;
  }

  return dbScheduling;
}
function pushDbScheduling(scheduling: Scheduling) {
  dbScheduling.push({
    Id: scheduling.Id,
    Active: scheduling.Active,
    RegistrationDate: scheduling.RegistrationDate,
    RegistrationUser: scheduling.RegistrationUser,
    BackgroundColor: scheduling.BackgroundColor,
    BorderColor: scheduling.BorderColor,
    TextColor: scheduling.TextColor,
    Editable: scheduling.Editable,
    Title: scheduling.Title,
    AllDay : scheduling.AllDay ,
    InitialDate: scheduling.InitialDate,
    FinalDate: scheduling.FinalDate,
    Department: scheduling.Department,
    Responsable: scheduling.Responsable,
    ResponsableContact: scheduling.ResponsableContact,
    ResponsableEmail: scheduling.ResponsableEmail,
    Place: scheduling.Place,
    Space: scheduling.Space,
  });
}
function convertToEventInput(listscheduling : Scheduling[]) : EventInput[]{
  var listevents : EventInput[] = [];
  listscheduling.forEach(scheduling => {
    listevents.push({
      id: scheduling.Id.toString(),
      allDay : scheduling.AllDay,
      backgroundColor: scheduling.BackgroundColor,
      borderColor: scheduling.BorderColor,
      editable: scheduling.Editable,
      date: new Date( scheduling.InitialDate.getFullYear(),
                      scheduling.InitialDate.getMonth(),
                      scheduling.InitialDate.getDate()),
      end: new Date(  scheduling.FinalDate.getFullYear(),
                      scheduling.FinalDate.getMonth(),
                      scheduling.FinalDate.getDate() +1),
      textColor: scheduling.TextColor,
      title: scheduling.Title
    });
  });
  return listevents;
}
function DbIsNull() {
  if(dbScheduling == null || dbScheduling == undefined)
    return true;
  else
    return false;
}