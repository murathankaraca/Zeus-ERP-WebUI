import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoDetailsComponent } from './eco-details.component';

describe('EcoDetailsComponent', () => {
  let component: EcoDetailsComponent;
  let fixture: ComponentFixture<EcoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
