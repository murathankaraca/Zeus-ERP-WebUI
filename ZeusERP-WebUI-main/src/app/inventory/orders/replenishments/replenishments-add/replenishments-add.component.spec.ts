import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplenishmentsAddComponent } from './replenishments-add.component';

describe('ReplenishmentsAddComponent', () => {
  let component: ReplenishmentsAddComponent;
  let fixture: ComponentFixture<ReplenishmentsAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
