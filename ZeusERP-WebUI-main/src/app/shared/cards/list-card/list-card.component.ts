import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  imgPath: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  getImgStyle(): object {
    if(this.imgPath) {
      return {
        'background-image': `url(${this.imgPath})`,
        'background-size': 'fill',
        'background-repeat': 'no-repeat',
        width: '128px',
        height: 'auto',
      };
    }
    else return {
      
    };
    
  }

}
