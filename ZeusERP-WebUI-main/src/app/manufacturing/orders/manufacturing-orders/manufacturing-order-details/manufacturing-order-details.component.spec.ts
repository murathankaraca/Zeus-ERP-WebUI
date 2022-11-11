import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingOrderDetailsComponent } from './manufacturing-orders-details.component';

describe('ManufacturingOrderDetailsComponent', () => {
  let component: ManufacturingOrderDetailsComponent;
  let fixture: ComponentFixture<ManufacturingOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
