import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { SpaceXService } from '../../../../core/services/space-x.service';
import { loadLaunchpads, loadLaunchpadsSuccess, loadLaunchpadsFailure, setCurrentPage, setTotalItems, loadLaunches, loadLaunchesFailure, loadLaunchesSuccess, searchLaunchpads, searchLaunchpadsFailure, searchLaunchpadsSuccess } from '../actions/launchpad.actions';
import { selectCurrentPage, selectItemsPerPage, selectTotalItems } from '../selectors/launchpad.selectors';

@Injectable()
export class LaunchpadEffects {
  constructor(
    private actions$: Actions,
    private spaceXService: SpaceXService,
    private store: Store,
  ) {}


  loadLaunchpads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaunchpads),
      withLatestFrom(
        this.store.pipe(select(selectCurrentPage)), // Select page from the store
        this.store.pipe(select(selectItemsPerPage)) // Select limit from the store
      ),
      mergeMap(([action, page, limit]) => // Use the retrieved page and limit
        this.spaceXService.getLaunchpads(page, limit).pipe(
          map(({ launchpads, totalItems, currentPage }) => {
            this.store.dispatch(setCurrentPage({ currentPage: page }));
            this.store.dispatch(setTotalItems({ totalItems: totalItems }));
            return loadLaunchpadsSuccess({ launchpads })
          }
        
        ),
          catchError(error => of(loadLaunchpadsFailure({ error })))
        )
      )
    )
  );

loadLaunches$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadLaunches),
    mergeMap((action) => {
      return this.spaceXService.getLaunches(action.launchpadId).pipe(
        tap((launches) => console.log('Launches loaded successfully:', launches)),
        map((launches) => loadLaunchesSuccess({ launches })),
        catchError((error) => {
          console.error('Error loading launches:', error);
          return of(loadLaunchesFailure({ error }));
        })
      );
    })
  )
);

searchLaunchpads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchLaunchpads),
      mergeMap(action =>
        this.spaceXService.searchLaunchpads(action.query).pipe(
          map(launchpads => searchLaunchpadsSuccess({ launchpads })),
          catchError(error => of(searchLaunchpadsFailure({ error })))
        )
      )
    )
  );
}
