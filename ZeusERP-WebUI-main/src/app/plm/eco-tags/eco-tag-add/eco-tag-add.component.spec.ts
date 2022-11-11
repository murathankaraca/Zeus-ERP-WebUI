import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoTagAddComponent } from './eco-tag-add.component';

describe('EcoTagAddComponent', () => {
  let component: EcoTagAddComponent;
  let fixture: ComponentFixture<EcoTagAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoTagAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoTagAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
