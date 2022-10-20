import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserListResponse } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  static URL = "https://reqres.in/api/users";

  public getAll() {
    return this.http.get<UserListResponse>(UserService.URL);
  }
}
