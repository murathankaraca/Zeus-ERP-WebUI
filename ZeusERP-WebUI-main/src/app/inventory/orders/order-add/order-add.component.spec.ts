import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderAddComponent } from './order-add.component';

describe('OrderAddComponent', () => {
  let component: OrderAddComponent;
  let fixture: ComponentFixture<OrderAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
