import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkersDetailsComponent } from './markers-details.component';

describe('MarkersDetailsComponent', () => {
  let component: MarkersDetailsComponent;
  let fixture: ComponentFixture<MarkersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
