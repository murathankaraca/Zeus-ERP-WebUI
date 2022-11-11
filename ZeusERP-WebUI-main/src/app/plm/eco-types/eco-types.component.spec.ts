import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoTypesComponent } from './eco-types.component';

describe('EcoTypesComponent', () => {
  let component: EcoTypesComponent;
  let fixture: ComponentFixture<EcoTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
