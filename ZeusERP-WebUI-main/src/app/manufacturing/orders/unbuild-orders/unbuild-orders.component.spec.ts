import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbuildOrdersComponent } from './unbuild-orders.component';

describe('UnbuildOrdersComponent', () => {
  let component: UnbuildOrdersComponent;
  let fixture: ComponentFixture<UnbuildOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbuildOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbuildOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
