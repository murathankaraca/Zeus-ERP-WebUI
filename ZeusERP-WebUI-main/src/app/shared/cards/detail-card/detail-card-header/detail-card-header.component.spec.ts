import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailCardHeaderComponent } from './detail-card-header.component';

describe('DetailCardHeaderComponent', () => {
  let component: DetailCardHeaderComponent;
  let fixture: ComponentFixture<DetailCardHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
