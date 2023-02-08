import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataService]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
  it('should return correct value', () => {
    const service: DataService = TestBed.get(DataService);
    expect(typeof service).toBe('object');
  });
});
