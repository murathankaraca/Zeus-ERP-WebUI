import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  opened: boolean = false;

  currentUser: string = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserByName();
  }

  navigate(url) {
    this.router.navigate(url);
  }

}
