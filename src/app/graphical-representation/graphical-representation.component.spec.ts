import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalRepresentationComponent } from './graphical-representation.component';

describe('GraphicalRepresentationComponent', () => {
  let component: GraphicalRepresentationComponent;
  let fixture: ComponentFixture<GraphicalRepresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicalRepresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
