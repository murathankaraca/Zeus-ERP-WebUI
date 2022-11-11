import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.scss']
})
export class ManufacturingComponent implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(url: Array<String>) {
    this.router.navigate(url);
  }

}
