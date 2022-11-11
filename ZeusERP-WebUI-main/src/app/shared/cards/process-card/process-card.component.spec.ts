import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessCardComponent } from './process-card.component';

describe('ProcessCardComponent', () => {
  let component: ProcessCardComponent;
  let fixture: ComponentFixture<ProcessCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
