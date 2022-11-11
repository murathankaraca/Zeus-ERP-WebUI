import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrapAddComponent } from './scrap-add.component';

describe('ScrapAddComponent', () => {
  let component: ScrapAddComponent;
  let fixture: ComponentFixture<ScrapAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
