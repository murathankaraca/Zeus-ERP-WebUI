import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Input()
  inDialogMode = false;

  constructor() { }

  ngOnInit(): void {
  }

}
