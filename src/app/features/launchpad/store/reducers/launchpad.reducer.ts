import { createReducer, on } from '@ngrx/store';
import { loadLaunchpads, loadLaunchpadsSuccess, loadLaunchpadsFailure, setCurrentPage, setItemsPerPage, setTotalItems, loadLaunches, loadLaunchesFailure, loadLaunchesSuccess, searchLaunchpadsSuccess } from '../actions/launchpad.actions';
import { initialState } from '../launchpad.state'

export const launchpadReducer = createReducer(
  initialState,
  on(loadLaunchpads, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadLaunchpadsSuccess, (state, { launchpads }) => ({
    ...state,
    launchpads,
    loading: false
  })),
  on(loadLaunchpadsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(setCurrentPage, (state, { currentPage }) => ({
     ...state, 
     currentPage
  })),
  on(setItemsPerPage, (state, { itemsPerPage }) => ({ 
    ...state,
    itemsPerPage
  })),
  on(setTotalItems, (state, { totalItems }) => ({
    ...state, 
    totalItems
 })),
 on(loadLaunches, state => ({
  ...state,
  loading: true,
  error: null
})),
on(loadLaunchesSuccess, (state, { launches }) => ({
  ...state,
  launches,
  loading: false
})),
on(loadLaunchesFailure, (state, { error }) => ({
  ...state,
  loading: false,
  error
})),

on(searchLaunchpadsSuccess, (state, { launchpads }) => ({
    ...state,
    launchpads,
    loading: false
  }))
);

