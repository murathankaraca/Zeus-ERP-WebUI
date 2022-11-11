import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoTagsComponent } from './eco-tags.component';

describe('EcoTagsComponent', () => {
  let component: EcoTagsComponent;
  let fixture: ComponentFixture<EcoTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
