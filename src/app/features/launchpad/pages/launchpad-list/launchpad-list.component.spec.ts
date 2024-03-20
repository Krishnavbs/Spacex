// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LaunchpadListComponent } from './launchpad-list.component';
// import { SpaceXFacade } from '../../spacex.facade';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Store, StoreModule } from '@ngrx/store';
// import * as LaunchpadActions from '../../store/actions/launchpad.actions';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { of } from 'rxjs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('LaunchpadListComponent', () => {
//   let component: LaunchpadListComponent;
//   let fixture: ComponentFixture<LaunchpadListComponent>;
//   let spaceXFacade: SpaceXFacade;
//   let store: MockStore;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LaunchpadListComponent],
//       imports: [ReactiveFormsModule, StoreModule.forRoot({}), MatPaginatorModule, BrowserAnimationsModule],
//       providers: [SpaceXFacade, provideMockStore()]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LaunchpadListComponent);
//     component = fixture.componentInstance;
//     spaceXFacade = TestBed.inject(SpaceXFacade);
//     store = TestBed.inject(MockStore);
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load launchpads on initialization', () => {
//     spyOn(spaceXFacade, 'loadLaunchpads');
//     spyOn(spaceXFacade, 'setPagination');
//     component.ngOnInit();
//     expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
//     expect(spaceXFacade.setPagination).toHaveBeenCalled();
//   });

//   it('should dispatch searchLaunchpads action on searchQuery value changes', () => {
//     spyOn(store, 'dispatch');
//     component.searchQuery.setValue('Test');
//     expect(store.dispatch).toHaveBeenCalledWith(
//       LaunchpadActions.searchLaunchpads({ query: 'Test' })
//     );
//   });

//   it('should call clearSearchbar method', () => {
//     spyOn(spaceXFacade, 'loadLaunchpads');
//     spyOn(component.searchQuery, 'reset');
//     component.clearSearchbar();
//     expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
//     expect(component.searchQuery.reset).toHaveBeenCalled();
//   });

//   it('should call onPageChange method', () => {
//     spyOn(spaceXFacade, 'setPagination');
//     spyOn(spaceXFacade, 'loadLaunchpads');
//     const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 20 };
//     component.onPageChange(event);
//     expect(spaceXFacade.setPagination).toHaveBeenCalledWith(2, 10);
//     expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
//   });
// });
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LaunchpadListComponent } from './launchpad-list.component';
import { SpaceXFacade } from '../../spacex.facade';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import * as LaunchpadActions from '../../store/actions/launchpad.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LaunchpadListComponent', () => {
  let component: LaunchpadListComponent;
  let fixture: ComponentFixture<LaunchpadListComponent>;
  let spaceXFacade: SpaceXFacade;
  let store: MockStore;
  let spaceXFacadeSpy: jasmine.SpyObj<SpaceXFacade>;
  

  beforeEach(async () => {
    spaceXFacadeSpy = jasmine.createSpyObj('SpaceXFacade', ['loadLaunchpads', 'launchpads$', 'setPagination']);
    await TestBed.configureTestingModule({
      declarations: [LaunchpadListComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), MatPaginatorModule, BrowserAnimationsModule],
      providers: [SpaceXFacade, provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchpadListComponent);
    component = fixture.componentInstance;
    spaceXFacade = TestBed.inject(SpaceXFacade);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load launchpads on initialization', () => {
    spyOn(spaceXFacade, 'loadLaunchpads');
    component.ngOnInit();
    expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
  });

  it('should dispatch searchLaunchpads action on searchQuery value changes', fakeAsync(() => {
    spyOn(store, 'dispatch');
    component.searchQuery.setValue('te');
    fixture.detectChanges(); 
    tick(300); 
    expect(store.dispatch).not.toHaveBeenCalled();
    component.searchQuery.setValue('test');
    fixture.detectChanges(); 
    tick(300);
    expect(store.dispatch).toHaveBeenCalledWith(LaunchpadActions.searchLaunchpads({ query: 'test' }));
  }));

  it('should clear searchQuery and load launchpads on clearSearchbar method call', () => {
    spyOn(spaceXFacade, 'loadLaunchpads');
    spyOn(component.searchQuery, 'reset');
    component.clearSearchbar();
    expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
    expect(component.searchQuery.reset).toHaveBeenCalled();
  });

  it('should call setPagination and load launchpads on onPageChange method', () => {
    spyOn(spaceXFacade, 'setPagination');
    spyOn(spaceXFacade, 'loadLaunchpads');
    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 20 };
    component.onPageChange(event);
    expect(spaceXFacade.setPagination).toHaveBeenCalledWith(2, 10);
    expect(spaceXFacade.loadLaunchpads).toHaveBeenCalled();
  });
});
