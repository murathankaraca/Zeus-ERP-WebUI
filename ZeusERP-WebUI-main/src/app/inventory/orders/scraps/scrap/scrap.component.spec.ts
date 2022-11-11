import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrapComponent } from './scrap.component';

describe('ScrapComponent', () => {
  let component: ScrapComponent;
  let fixture: ComponentFixture<ScrapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
