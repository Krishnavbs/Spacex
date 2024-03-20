import { Component, OnInit, ViewChild } from '@angular/core';
import { SpaceXFacade } from '../../spacex.facade';
import { Launchpad } from '../../../../core/models/launchpad.model';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { selectCurrentPage, selectItemsPerPage, selectTotalItems } from '../../store/selectors/launchpad.selectors';
import { FormControl } from '@angular/forms';
import * as LaunchpadActions from '../../store/actions/launchpad.actions'

@Component({
  selector: 'app-launchpad-list',
  templateUrl: './launchpad-list.component.html',
  styleUrls: ['./launchpad-list.component.css']
})
export class LaunchpadListComponent implements OnInit {
  launchpads: Launchpad[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems$: Observable<number> | undefined;
  currentPage$: Observable<number> | undefined;
  itemsPerPage$: Observable<number> | undefined;

  searchQuery = new FormControl();


  constructor(private spaceXFacade: SpaceXFacade, private store: Store) {

   }

  ngOnInit(): void {
    this.spaceXFacade.loadLaunchpads();
    if(this.spaceXFacade.launchpads$){
    this.spaceXFacade.launchpads$.subscribe(launchpads => {
      this.launchpads = launchpads;
    });
  }
    this.totalItems$ = this.store.pipe(select(selectTotalItems));
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.itemsPerPage$ = this.store.pipe(select(selectItemsPerPage));

    this.searchQuery.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => query.length >= 3)
    ).subscribe(query => {
      if (query.length >= 3) {
        this.store.dispatch(LaunchpadActions.searchLaunchpads({ query }));
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.spaceXFacade.setPagination(event.pageIndex + 1, event.pageSize)
    this.spaceXFacade.loadLaunchpads();
  }
  clearSearchbar(){
    this.spaceXFacade.loadLaunchpads();
    this.searchQuery.reset()
  }
}
