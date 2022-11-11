import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-card-header',
  templateUrl: './detail-card-header.component.html',
  styleUrls: ['./detail-card-header.component.scss']
})
export class DetailCardHeaderComponent implements OnInit {

  constructor() { }

  @Input()
  title: string = "Undefined Product";
  @Input()
  imgPath: string;

  ngOnInit(): void {
    console.log(this.imgPath);
  }

  getImgStyle(): object {
    return {
      'background-image': `url(${this.imgPath})`,
      'background-size': 'contain',
      width: '128px',
      height: '64px',
    }
  }

}
