import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrapsComponent } from './scraps.component';

describe('ScrapsComponent', () => {
  let component: ScrapsComponent;
  let fixture: ComponentFixture<ScrapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
