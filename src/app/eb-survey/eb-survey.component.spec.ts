import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbSurveyComponent } from './eb-survey.component';

describe('EbSurveyComponent', () => {
  let component: EbSurveyComponent;
  let fixture: ComponentFixture<EbSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
