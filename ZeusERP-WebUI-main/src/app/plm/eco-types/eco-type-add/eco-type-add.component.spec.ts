import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoTypeAddComponent } from './eco-type-add.component';

describe('EcoTypeAddComponent', () => {
  let component: EcoTypeAddComponent;
  let fixture: ComponentFixture<EcoTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoTypeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
