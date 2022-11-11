import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detail-secondary-header',
  templateUrl: './detail-secondary-header.component.html',
})
export class DetailSecondaryHeaderComponent implements OnInit {

  @Input()
  title: string = "";
  @Input()
  padding: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

  getStyle(): object {
    return {
      margin: 0,
      padding: this.padding,
      display: 'flex',
      'justify-content': 'flex-start',
      'align-items': 'center',
    };
  }

}
