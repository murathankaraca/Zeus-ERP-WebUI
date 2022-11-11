import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WarehousesComponent } from './warehouses.component';

describe('WarehousesComponent', () => {
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
