import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEBGuideComponent } from './list-ebguide.component';

describe('ListEBGuideComponent', () => {
  let component: ListEBGuideComponent;
  let fixture: ComponentFixture<ListEBGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEBGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEBGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
