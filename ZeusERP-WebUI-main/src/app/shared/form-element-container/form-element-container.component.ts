import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-element-container',
  templateUrl: './form-element-container.component.html',
  styleUrls: ['./form-element-container.component.scss']
})
export class FormElementContainerComponent implements OnInit {
  @Input()
  padding: string = "0.75rem";

  constructor() { }

  ngOnInit(): void {
  }

  getStyles(): object {
    return {
      padding: this.padding,
      boxSizing: 'border-box',
    };
  }

}
