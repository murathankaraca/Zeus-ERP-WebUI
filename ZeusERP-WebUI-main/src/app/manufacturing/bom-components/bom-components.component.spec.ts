import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomComponentsComponent } from './bom-components.component';

describe('BomComponentsComponent', () => {
  let component: BomComponentsComponent;
  let fixture: ComponentFixture<BomComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
