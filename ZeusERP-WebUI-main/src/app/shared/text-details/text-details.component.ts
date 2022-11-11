import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.scss']
})
export class TextDetailsComponent implements OnInit {

  @Input()
  label: string = "";
  @Input()
  labelPosition: string = "column";
  @Input()
  data: any = "";
  @Input()
  dataPosition: string = "column";
  @Input()
  padding: string = "0.75rem";

  constructor() { }

  ngOnInit(): void {
  }

  getStyles(): object {
    return {
      boxSizing: 'border-box',
      padding: this.padding,
    };
  }

}
