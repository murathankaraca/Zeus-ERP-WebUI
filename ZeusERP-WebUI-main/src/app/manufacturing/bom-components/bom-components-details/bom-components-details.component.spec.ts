import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomComponentsDetailsComponent } from './bom-components-details.component';

describe('BomComponentsDetailsComponent', () => {
  let component: BomComponentsDetailsComponent;
  let fixture: ComponentFixture<BomComponentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomComponentsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomComponentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
