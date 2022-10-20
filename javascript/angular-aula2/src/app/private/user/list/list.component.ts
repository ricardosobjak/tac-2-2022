import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pessoas: Array<any> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Invocar a API para obter a lista de pessoas
    this.userService.getAll().subscribe( res => {
      console.log(res);
      this.pessoas = res.data;
    });
  }

}
