import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPresentComponent } from './feedback-present.component';

describe('FeedbackPresentComponent', () => {
  let component: FeedbackPresentComponent;
  let fixture: ComponentFixture<FeedbackPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
