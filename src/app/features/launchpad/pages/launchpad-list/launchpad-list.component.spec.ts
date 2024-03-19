// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { LaunchpadListComponent } from './launchpad-list.component';
// import { Store } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { SpaceXFacade } from '../../spacex.facade';
// import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('LaunchpadListComponent', () => {
//   let component: LaunchpadListComponent;
//   let fixture: ComponentFixture<LaunchpadListComponent>;
//   let storeMock: jasmine.SpyObj<Store>;
//   let spaceXFacade: jasmine.SpyObj<SpaceXFacade>;
//   let mockSpaceXFacade: {
//     setPagination: jasmine.Spy<any>; 
//     loadLaunchpads: jasmine.Spy<any>; 
// };
//   let store: Store<any>; // Import Store and add it here

//   beforeEach(async () => {
//     storeMock = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
//     await TestBed.configureTestingModule({
//       declarations: [LaunchpadListComponent],
//       imports: [MatPaginatorModule, ReactiveFormsModule, BrowserAnimationsModule],
//       providers: [{ provide: Store, useValue: storeMock }]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LaunchpadListComponent);
//     component = fixture.componentInstance;
//     mockSpaceXFacade = {
//       setPagination: jasmine.createSpy('setPagination'),
//       loadLaunchpads: jasmine.createSpy('loadLaunchpads').and.returnValue({
//           subscribe: () => {} // Stubbing the subscribe method
//       }),
//   };
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load launchpads on initialization', () => {
//     expect(mockSpaceXFacade.loadLaunchpads).toHaveBeenCalled();
//   });

//   it('should set pagination on page change', () => {
//     const event = { pageIndex: 1, pageSize: 10 } as MatPaginator;
//     component.onPageChange(event);
//     expect(mockSpaceXFacade.setPagination).toHaveBeenCalledWith(2, 10);
//   });

//   it('should set pagination on page change', () => {
//     const event = { pageIndex: 1, pageSize: 10 } as MatPaginator;
//     component.onPageChange(event);
//     expect(mockSpaceXFacade.setPagination).toHaveBeenCalledWith(2, 10);
//   });

//   it('should dispatch searchLaunchpads action on searchQuery value changes', () => {
//     const query = 'test';
//     const spy = spyOn(store, 'dispatch'); // Use store instead of component.store
//     component['searchQuery'].setValue(query); // Access private property using indexer
//     expect(spy).toHaveBeenCalled();
//   });

// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaunchpadListComponent } from './launchpad-list.component';
import { Store } from '@ngrx/store';
import { SpaceXFacade } from '../../spacex.facade';
import { of } from 'rxjs';

describe('LaunchpadListComponent', () => {
  let component: LaunchpadListComponent;
  let fixture: ComponentFixture<LaunchpadListComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let spaceXFacade: jasmine.SpyObj<SpaceXFacade>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
    spaceXFacade = jasmine.createSpyObj('SpaceXFacade', ['setPagination', 'loadLaunchpads']);

    await TestBed.configureTestingModule({
      declarations: [LaunchpadListComponent],
      imports: [MatPaginatorModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: SpaceXFacade, useValue: spaceXFacade }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchpadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should load launchpads on initialization', () => {
  //     const launchpads: any[] = [
  //         {"id":"1","name":"Launchpad 1","location":{"name":"Location 1","region":"Region 1"},"image":"path/to/image-1","launches":[{"mission":"Mission 1 from Launchpad 1","date":"2024-03-16"},{"mission":"Mission 2 from Launchpad 1","date":"2024-03-17"}]},
  //         {"id":"2","name":"Launchpad 2","location":{"name":"Location 2","region":"Region 2"},"image":"path/to/image-2","launches":[{"mission":"Mission 1 from Launchpad 2","date":"2024-03-16"},{"mission":"Mission 2 from Launchpad 2","date":"2024-03-17"}]},
  //         {"id":"3","name":"Launchpad 3","location":{"name":"Location 3","region":"Region 3"},"image":"path/to/image-3","launches":[{"mission":"Mission 1 from Launchpad 3","date":"2024-03-16"},{"mission":"Mission 2 from Launchpad 3","date":"2024-03-17"}]},
  //         {"id":"4","name":"Launchpad 4","location":{"name":"Location 4","region":"Region 4"},"image":"path/to/image-4","launches":[{"mission":"Mission 1 from Launchpad 4","date":"2024-03-16"},{"mission":"Mission 2 from Launchpad 4","date":"2024-03-17"}]},
  //         {"id":"5","name":"Launchpad 5","location":{"name":"Location 5","region":"Region 5"},"image":"path/to/image-5","launches":[{"mission":"Mission 1 from Launchpad 5","date":"2024-03-16"},{"mission":"Mission 2 from Launchpad 5","date":"2024-03-17"}]}
  //     ];
  
  //     spyOn(spaceXFacade, 'loadLaunchpads').and.callFake(() => {
  //         component.launchpads = launchpads; // Set the component property with the mock launchpads
  //         return of([]); // Return an observable of void
  //     });
  
  //     component.ngOnInit(); // Trigger the ngOnInit method
  
  //     expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled(); // Check if the method was called
  // });
  

  it('should set pagination on page change', () => {
    const event = { pageIndex: 1, pageSize: 10 } as MatPaginator;
    component.onPageChange(event);
    expect(spaceXFacade.setPagination).toHaveBeenCalledWith(2, 10);
  });

  it('should dispatch searchLaunchpads action on searchQuery value changes', () => {
    const query = 'test';
    component.searchQuery.setValue(query);
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
  

});

