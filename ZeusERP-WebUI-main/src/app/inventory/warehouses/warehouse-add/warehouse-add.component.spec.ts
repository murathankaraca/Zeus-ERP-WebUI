import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WarehouseAddComponent } from './warehouse-add.component';

describe('WarehouseAddComponent', () => {
  let component: WarehouseAddComponent;
  let fixture: ComponentFixture<WarehouseAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
