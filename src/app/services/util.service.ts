import { Injectable, NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  constructor() { }

  //in Augusto F Gonçalvez Souza out Augusto Souza
  static NameString(name : string) :string{
    var formatName = "";
  
    if(name != ""){
      var listName = name.split(" ");
      formatName = listName[0];
      
      if (listName.length > 1)
        formatName += " " + listName[listName.length-1]
    }
    
    return formatName;
  }
  //in 41997096666 out (41)99709-6666
  static PhoneString(ResponsableContact: string) : string{
    var formatPhone = "";
    
    if(ResponsableContact != "" && ResponsableContact.length == 11)
    {
      var phone = ResponsableContact.trim();
      var cod = phone.substr(0,2);
      var number01 = phone.substring(2,7)
      var number02 = phone.substring(7,phone.length)
      formatPhone = "("+cod+") "+number01+" - "+number02;
      return formatPhone;
    }
    return ResponsableContact;
  }
  //in date_06/10/2021 out str_06/10/2021
  static DateString(date : Date) : string {
    var formatDate = "";
    if(date != null)
    {
      var day = date.getDate().toString();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      formatDate = day + "/" + month + "/" + year;
    }  
    return formatDate;
  }
  //in str_06/10/2021 out date_06/10/2021
  static StrToDate(date: string) : Date {
    var dateFormat : Date;
    if(date != null && date?.indexOf("-") > 0){
      var listDate = date.split("-");
      if (listDate.length > 2){
        var year : number = + listDate[0];
        var month : number = + listDate[1];
        var day : number = + listDate[2];
        dateFormat = new Date(year,month,day);
      }
    }
    return dateFormat;
  }
  //out map month (1,2,..,11,12) values 0
  static EmptyMonthDictionary() : Map<number,number>{
    var map = new Map<number,number>();
    map.set(1,0);
    map.set(2,0);
    map.set(3,0);
    map.set(4,0);
    map.set(5,0);
    map.set(6,0);
    map.set(7,0);
    map.set(8,0);
    map.set(9,0);
    map.set(10,0);
    map.set(11,0);
    map.set(12,0);
    return map;
  }
  //in date inicial and final out number of days
  static CountDays(dateInitial : Date,dateFinal : Date) : number{
    if(dateInitial == null || dateInitial == undefined ||
        dateFinal == null || dateFinal == undefined)
      return 0

    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = dateInitial.getTime();
    var date2_ms = dateFinal.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
  }
  //remove ( ) . - @ " "
  static ClearString(data : string) : string{
    if(data != "" && data != null && data != undefined){
      var clearString = data.toString();

      while(clearString.indexOf(")") > 0){
        clearString = clearString.replace(")",""); }
      while(clearString.indexOf("(") > 0){
        clearString = clearString.replace("(",""); }
      while(clearString.indexOf("-") > 0){
        clearString = clearString.replace("-",""); }
      while(clearString.indexOf("@") > 0){
        clearString = clearString.replace("@",""); }
      while(clearString.indexOf(" ") > 0){
        clearString = clearString.replace(" ",""); }
      while(clearString.indexOf(".") > 0){
        clearString = clearString.replace(".",""); }
      clearString = clearString.toUpperCase();  

      return clearString;
    }
    else{
      return "";
    }
  }
}
