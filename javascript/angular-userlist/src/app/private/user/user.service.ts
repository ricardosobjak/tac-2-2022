import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListResponse, SingleUserResponse, User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DEFAULT_API } from 'src/app/app.const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getHttpOptions(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public getUsers = (page?: number, perPage?: number): Observable<UserListResponse> => {
    let params: string[] = [];
    if (page) params = params.concat(`page=${page}`);
    if (perPage) params = params.concat(`per_page=${perPage}`);

    console.log(params);

    return this.http.get<UserListResponse>(
      DEFAULT_API + 'users' + (params.length > 0 ? '?' + params.join('&') : '')
    );
  };

  public getUser = (id: number): Observable<SingleUserResponse> => {
    return this.http.get<SingleUserResponse>(DEFAULT_API + 'users/' + id);
  };

  public create = (user: User): Observable<User> => {
    return this.http.post<User>(DEFAULT_API + 'users', JSON.stringify(user), {
      headers: this.getHttpOptions(),
    });
  };

  public update = (user: User): Observable<User> => {
    return this.http.put<User>(
      `${DEFAULT_API}users/${user.id}`,
      JSON.stringify(user),
      {
        headers: this.getHttpOptions(),
      }
    );
  };

  public createOrUpdate = (user: User): Observable<User> => {
    return user.id ? this.update(user) : this.create(user);
  };
}
