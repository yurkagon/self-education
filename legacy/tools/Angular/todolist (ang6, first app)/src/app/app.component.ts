import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

import IUser from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  users: Array<IUser> = [];
  filter: string;

  constructor(private dataService: DataService) {
    this.title = 'List of users';
    this.filter = '';
  }
  ngOnInit(): void {
    this.dataService.getUsers().subscribe((res: Array<IUser>) => (this.users = res));
  }

  onChange = ({ target: { value } }) => (this.filter = value);
}
