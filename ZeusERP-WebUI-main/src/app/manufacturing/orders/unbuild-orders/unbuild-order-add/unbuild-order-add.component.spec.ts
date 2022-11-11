import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbuildOrderAddComponent } from './unbuild-order-add.component';

describe('UnbuildOrderAddComponent', () => {
  let component: UnbuildOrderAddComponent;
  let fixture: ComponentFixture<UnbuildOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbuildOrderAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbuildOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
