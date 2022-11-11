import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-card-details',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent implements OnInit {

  @Input()
  inDialogMode = false;

  constructor() { 
    console.log()
  }


  ngOnInit(): void {
  }

}
