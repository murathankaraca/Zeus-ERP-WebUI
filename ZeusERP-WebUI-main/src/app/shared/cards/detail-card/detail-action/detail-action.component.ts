import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-detail-action',
  templateUrl: './detail-action.component.html',
  styleUrls: ['./detail-action.component.scss']
})
export class DetailActionComponent implements OnInit {

  @Input('title')
  title: string;
  @Input('quantity')
  quantity: number;
  @Input('iconName')
  iconName: string = "";
  @Output('navigateTo')
  navigateTo = new EventEmitter<any>();
  constructor(private router: Router) { }
 
  ngOnInit(): void {
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.navigateTo.emit();
  }

  


}
