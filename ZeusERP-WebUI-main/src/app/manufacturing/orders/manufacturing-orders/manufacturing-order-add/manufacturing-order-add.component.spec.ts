import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingOrderAddComponent } from './manufacturing-order-add.component';

describe('ManufacturingOrderAddComponent', () => {
  let component: ManufacturingOrderAddComponent;
  let fixture: ComponentFixture<ManufacturingOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingOrderAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
