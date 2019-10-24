import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingGroupsComponent } from './training-groups.component';

describe('TrainingGroupsComponent', () => {
  let component: TrainingGroupsComponent;
  let fixture: ComponentFixture<TrainingGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
