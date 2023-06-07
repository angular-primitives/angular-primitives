import { TestBed } from '@angular/core/testing';

import { NgPrimitivesService } from './ng-primitives.service';

describe('NgPrimitivesService', () => {
  let service: NgPrimitivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPrimitivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
