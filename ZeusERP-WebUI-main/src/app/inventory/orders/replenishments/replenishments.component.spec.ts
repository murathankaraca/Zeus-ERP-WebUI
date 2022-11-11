import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplenishmentsComponent } from './replenishments.component';

describe('ReplenishmentsComponent', () => {
  let component: ReplenishmentsComponent;
  let fixture: ComponentFixture<ReplenishmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
