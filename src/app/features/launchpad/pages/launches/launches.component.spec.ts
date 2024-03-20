import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LaunchesComponent } from './launches.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SpaceXFacade } from '../../spacex.facade';
import { MatTableModule } from '@angular/material/table';

describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;
  let routeStub: Partial<ActivatedRoute>;
  let spaceXFacadeStub: Partial<SpaceXFacade>;

  beforeEach(async () => {
    const routeStub = {
      paramMap: of({
        get: (key: string) => '123', 
        has: (name: string) => name === 'id', 
        getAll: (name: string) => (name === 'id' ? ['123'] : []),
        keys: () => ['id'] 
      })
    };

    spaceXFacadeStub = {
      loadLaunches: jasmine.createSpy(),
      launches$: of([]) // Initial launch data
    };

    await TestBed.configureTestingModule({
      declarations: [LaunchesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: SpaceXFacade, useValue: spaceXFacadeStub },
        { provide: Store, useValue: {} } // Mock Store
      ],
      imports: [MatTableModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load launches for the specified launchpad on initialization', () => {
    expect(spaceXFacadeStub.loadLaunches).toHaveBeenCalledWith('123');
  });

  it('should update launches property when launches$ emits new launches', fakeAsync(() => {
    const newLaunches = [
      {
        id: '1',
        name: 'Launch 1',
        success: true,
        wikipedia: 'https://en.wikipedia.org/wiki/Launch_1',
        launchpad: 'Launchpad 1'
      },
      {
        id: '2',
        name: 'Launch 2',
        success: false,
        wikipedia: 'https://en.wikipedia.org/wiki/Launch_2',
        launchpad: 'Launchpad 2'
      },
      {
        id: '3',
        name: 'Launch 3',
        success: true,
        wikipedia: 'https://en.wikipedia.org/wiki/Launch_3',
        launchpad: 'Launchpad 3'
      }
    ];
    spaceXFacadeStub.launches$ = of(newLaunches);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.launches).toEqual(newLaunches);
  }));
});
