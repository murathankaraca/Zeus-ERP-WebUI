import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoAddComponent } from './eco-add.component';

describe('EcoAddComponent', () => {
  let component: EcoAddComponent;
  let fixture: ComponentFixture<EcoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
