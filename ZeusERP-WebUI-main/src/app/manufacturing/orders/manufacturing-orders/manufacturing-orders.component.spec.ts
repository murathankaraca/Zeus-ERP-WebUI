import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingOrdersComponent } from './manufacturing-orders.component';

describe('ManufacturingOrdersComponent', () => {
  let component: ManufacturingOrdersComponent;
  let fixture: ComponentFixture<ManufacturingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
