// src/app/features/launchpad/store/selectors/launchpad.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LaunchpadState } from '../launchpad.state';

export const selectLaunchpadState = createFeatureSelector<LaunchpadState>('launchpad');

export const selectLaunchpads = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.launchpads
);

export const selectLaunchpadsLoading = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.loading
);

export const selectLaunchpadsError = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.error
);

export const selectItemsPerPage = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state?.itemsPerPage || 5
);

export const selectTotalItems = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state?.totalItems || 0
);

export const selectCurrentPage = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state?.currentPage || 1
);

export const selectLaunches = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.launches
);

export const selectLaunchesLoading = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.loading
);

export const selectLaunchesError = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.error
);

// Select the launchpads from the launchpad feature state
export const searchLaunchpads = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.launchpads
);

// Select the loading state from the launchpad feature state
export const searchLoading = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.loading
);

// Select the error state from the launchpad feature state
export const searchError = createSelector(
  selectLaunchpadState,
  (state: LaunchpadState) => state.error
);