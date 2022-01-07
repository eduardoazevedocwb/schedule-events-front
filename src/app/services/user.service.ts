import { UtilService } from 'src/app/services/util.service';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { Injectable } from '@angular/core';

var dbUser: User [] = [];

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient) { 
    createDbUser();
  }

  static getByContact (parameter : string) : User {
    var listUser = createDbUser();
    var item = null;
    listUser.forEach(user => {
      var email = UtilService.ClearString(user.Email);
      var contact = UtilService.ClearString(user.Contact);
      var param = UtilService.ClearString(parameter);
      if(param == contact || param == email)
        item = user;
    });
    return item;
  }

  static set(user: User) {
    dbUser.push(user);
  }
}

function createDbUser() : User[] {
  dbUser = [];
  dbUser.push({
    ID: 1,
    RegistrationDate: new Date(),
    RegistrationUser: "System",
    Active: true,
    Name:"Eduardo",
    Contact:"41997098888",
    Email:"email@email.com"
  });
  return dbUser
}