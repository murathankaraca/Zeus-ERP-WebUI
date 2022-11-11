import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManufacturingComponent } from './manufacturing.component';

describe('ManufacturingComponent', () => {
  let component: ManufacturingComponent;
  let fixture: ComponentFixture<ManufacturingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
