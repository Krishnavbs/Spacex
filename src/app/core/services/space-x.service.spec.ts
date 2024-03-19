import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpaceXService } from './space-x.service';

describe('SpaceXService', () => {
  let service: SpaceXService;
  let httpMock: HttpTestingController;
   const baseUrl = 'https://api.spacexdata.com/v4';
   const baseUrlV5 = 'https://api.spacexdata.com/v5';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpaceXService]
    });
    service = TestBed.inject(SpaceXService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch launchpads', () => {
    const mockLaunchpads = [{ id: '1', name: 'Launchpad 1' }, { id: '2', name: 'Launchpad 2' }];
    const mockResponse = { docs: mockLaunchpads, totalDocs: 2, page: 1 };

    service.getLaunchpads(1, 10).subscribe(data => {
      expect(data.launchpads.length).toBe(2);
      expect(data.totalItems).toBe(2);
      expect(data.currentPage).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/launchpads/query`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch launches', () => {
    const mockLaunches = [{ id: '1', name: 'Launch 1' }, { id: '2', name: 'Launch 2' }];
    const mockResponse = { docs: mockLaunches };

    service.getLaunches('1').subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpMock.expectOne(`${baseUrlV5}/launches/query`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should search launchpads', () => {
    const mockLaunchpads = [{ id: '1', name: 'Launchpad 1', region: 'Region 1' }];
    const mockResponse = { docs: mockLaunchpads };

    service.searchLaunchpads('Launchpad').subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/launchpads/query`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
