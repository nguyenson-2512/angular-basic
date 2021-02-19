import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: Object;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    const result = this.user.getInfo()
    this.userData = {...result}
  }
}
