import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EBGuideFormComponent } from './ebguide-form.component';

describe('EBGuideFormComponent', () => {
  let component: EBGuideFormComponent;
  let fixture: ComponentFixture<EBGuideFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EBGuideFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EBGuideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
