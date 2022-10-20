import { Component, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { UserListResponse } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  apiResponse: UserListResponse | undefined;

  activePage = 1;
  perPage = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(this.activePage);
  }

  public loadUsers(page: number) {
    this.activePage = page;

    this.userService
      .getUsers(page, this.perPage)
      .pipe(
        catchError((error) => {
          console.log(error);
          alert('Falha ao obter a lista de usuários');
          return of(new UserListResponse());
        }),
        finalize(() => {})
      )
      .subscribe((res: UserListResponse) => {
        console.log(res);
        this.apiResponse = res;
      });
  }

  pages(size: number | undefined) {
    return new Array(size).keys();
  }
}
