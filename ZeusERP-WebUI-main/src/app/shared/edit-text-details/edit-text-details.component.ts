import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-text-details',
  templateUrl: './edit-text-details.component.html',
  styleUrls: ['./edit-text-details.component.scss']
})
export class EditTextDetailsComponent implements OnInit {

  @Input()
  label: string = "";
  @Input()
  padding: string = "0.5rem";

  constructor() { }

  ngOnInit(): void {
  }

  getStyles(): object {
    return {
      padding: this.padding,
    };
  }

}
