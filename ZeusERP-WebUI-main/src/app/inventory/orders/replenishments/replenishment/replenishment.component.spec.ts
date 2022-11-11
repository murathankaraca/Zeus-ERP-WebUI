import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReplenishmentComponent } from './replenishment.component';

describe('ReplenishmentComponent', () => {
  let component: ReplenishmentComponent;
  let fixture: ComponentFixture<ReplenishmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
