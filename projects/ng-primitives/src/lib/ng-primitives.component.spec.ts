import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPrimitivesComponent } from './ng-primitives.component';

describe('NgPrimitivesComponent', () => {
  let component: NgPrimitivesComponent;
  let fixture: ComponentFixture<NgPrimitivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgPrimitivesComponent]
    });
    fixture = TestBed.createComponent(NgPrimitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
