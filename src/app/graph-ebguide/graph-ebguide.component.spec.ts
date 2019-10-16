import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphEbguideComponent } from './graph-ebguide.component';

describe('GraphEbguideComponent', () => {
  let component: GraphEbguideComponent;
  let fixture: ComponentFixture<GraphEbguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphEbguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphEbguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
