import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbuildOrderDetailsComponent } from './unbuild-order-details.component';

describe('UnbuildOrdersDetailsComponent', () => {
  let component: UnbuildOrderDetailsComponent;
  let fixture: ComponentFixture<UnbuildOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbuildOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbuildOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
