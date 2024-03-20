import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Launches, Launchpad } from '../../core/models/launchpad.model';
import * as LaunchpadActions from './store/actions/launchpad.actions';
import * as LaunchpadSelectors from './store/selectors/launchpad.selectors';

@Injectable({
  providedIn: 'root'
})
export class SpaceXFacade {
  searchLaunchpads(searchLaunchpads: any) {
    throw new Error('Method not implemented.');
  }
  launchpads$: Observable<Launchpad[]> = this.store.pipe(select(LaunchpadSelectors.selectLaunchpads));
  loading$: Observable<boolean> = this.store.pipe(select(LaunchpadSelectors.selectLaunchpadsLoading));
  error$: Observable<any> = this.store.pipe(select(LaunchpadSelectors.selectLaunchpadsError));

  totalItems$: Observable<number> = this.store.pipe(select(LaunchpadSelectors.selectTotalItems));
  currentPage$: Observable<number> = this.store.pipe(select(LaunchpadSelectors.selectCurrentPage));
  itemsPerPage$ : Observable<number>= this.store.pipe(select(LaunchpadSelectors.selectItemsPerPage));

  launches$: Observable<Launches[]> = this.store.pipe(select(LaunchpadSelectors.selectLaunches), filter(launches => !!launches));
  launchesLoading$: Observable<boolean> = this.store.pipe(select(LaunchpadSelectors.selectLaunchesLoading));
  LaunchesError$: Observable<any> = this.store.pipe(select(LaunchpadSelectors.selectLaunchesError));

  constructor(private store: Store) {}

  loadLaunchpads(): void {
    this.store.dispatch(LaunchpadActions.loadLaunchpads());
  }
  setPagination(pageIndex: number, itemsPerPage: number): void {
    this.store.dispatch(LaunchpadActions.setCurrentPage({ currentPage: pageIndex }))
    this.store.dispatch(LaunchpadActions.setItemsPerPage({ itemsPerPage: itemsPerPage }))
  }

  loadLaunches(launchpadId: string): void {
    this.store.dispatch(LaunchpadActions.loadLaunches({launchpadId: launchpadId}));
  }
}
