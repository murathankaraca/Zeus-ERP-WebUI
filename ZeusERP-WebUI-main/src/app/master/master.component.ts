import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

interface navItem {
  [key: string]: any;
} 

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  tileStyle: object = {
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'box-sizing': 'border-box',
    'margin': '0.1rem',
    'padding': '0',
    'width': '10rem',
    'height': '10rem',
  }

  modules: Array<navItem> = [
    { 
      'name': 'Contacts',
      'iconName': 'supervised_user_circle',
      'navigation': () => this.navigateToContacts(),
    },
    { 
      'name': 'Inventory',
      'iconName': 'storage',
      'navigation': () => this.navigateToInv(),
    },
    { 
      'name': 'Manufacturing',
      'iconName': 'edit',
      'navigation': () => this.navigateToManu(),
    },
    { 
      'name': 'PLM',
      'iconName': 'edit',
      'navigation': () => this.navigateToPLM(),
    },
    { 
      'name': 'Account',
      'iconName': 'contacts',
      'navigation': () => this.navigateToInv(),
    },
    { 
      'name': 'Logout',
      'iconName': 'sensor_door',
      'navigation': () => this.logout(),
    },
  ]

  constructor(private router: Router, private userService: UserService) {
    if(this.userService.getActiveSession()) {
      console.log("Access was granted.");
    } else {
      this.navigateToLogin();
    }
  }

  ngOnInit(): void {
  }

  navigateToLogin(): void {
    this.router.navigate(['/']);
  }

  navigateToInv(): void {
    this.router.navigate(['/', 'inventory', 'products']);
  }

  navigateToManu(): void {
    this.router.navigate(['/', 'manufacturing']);
  }

  navigateToPLM(): void {
    this.router.navigate(['/', 'plm']);
  }

  navigateToContacts(): void {
    this.router.navigate(['/', 'inventory','contacts']);
  }

  logout(): void {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if(username && token) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    }
    this.router.navigate(['/']);
  }

}
