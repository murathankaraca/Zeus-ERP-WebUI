import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {

  @Input()
  item: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
