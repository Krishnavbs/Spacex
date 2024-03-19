import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { LaunchesComponent } from './launches.component';
import { SpaceXFacade } from '../../spacex.facade';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Launches } from '../../../../core/models/launchpad.model';

describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;
  let route: ActivatedRoute;
  let store: Store<any>; // Replace any with your store state interface
  let spaceXFacade: SpaceXFacade;
  let mockSpaceXFacade: { loadLaunches: { and: { returnValue: (arg0: Observable<Launches[]>) => void; }; }; };

  beforeEach(async () => {
    mockSpaceXFacade = jasmine.createSpyObj('SpaceXFacade', ['loadLaunches']);
    mockSpaceXFacade.loadLaunches.and.returnValue(of([])); 
    const routeStub = { paramMap: of({ get: () => 'launchpad_id' }) }; // Replace 'launchpad_id' with a valid launchpad ID
    const storeStub = { dispatch: () => {}, pipe: () => {} };
    const spaceXFacadeStub = {
      loadLaunches: () => {},
      launches$: of([]) // Provide a mock launches observable
    };
    await TestBed.configureTestingModule({
      declarations: [LaunchesComponent],
      imports: [MatCardModule, MatTableModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Store, useValue: storeStub },
        { provide: SpaceXFacade, useValue: spaceXFacadeStub }
      ]
    }).compileComponents();
    route = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(Store);
    spaceXFacade = TestBed.inject(SpaceXFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load launches on initialization with the launchpad ID from route', () => {
    spyOn(spaceXFacade, 'loadLaunches');
    component.ngOnInit();
    expect(spaceXFacade.loadLaunches).toHaveBeenCalledWith('launchpad_id');
  });

  it('should update launches when launches$ emits new data', () => {
    // const mockLaunches = [ {id: '1',
    // name: 'launch 1',
    // success: true,
    // wikipedia: 'wikiLink',
    // launchpad: 'ATC',
    // }];
    // component.ngOnInit();
    // expect(component.launches).toEqual([]);
    // spyOn(store, 'pipe').and.returnValue(of(mockLaunches));
    // fixture.detectChanges();
    // expect(component.launches).toEqual(mockLaunches);
    const mockLaunches: Launches[] = [{ id: '1', name: 'launch 1', success: true, wikipedia: 'wikiLink', launchpad: 'ATC' }];

    // Update the mocked observable to emit the mock data
    mockSpaceXFacade.loadLaunches.and.returnValue(of(mockLaunches));

    // Trigger change detection
    fixture.detectChanges();

    // Check if launches are updated
    expect(component.launches).toEqual(mockLaunches);
  });
});
