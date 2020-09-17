import { MyHttpService } from './my-http.service';
import { TestBed } from '@angular/core/testing';

describe('MyHttpService', () => {
  let service: MyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
