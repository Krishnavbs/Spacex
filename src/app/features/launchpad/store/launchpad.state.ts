// src/app/features/launchpad/store/launchpad.state.ts

import { Launches, Launchpad } from '../../../core/models/launchpad.model';

export interface LaunchpadState {
  launchpads: Launchpad[];
  loading: boolean;
  error: any;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  launches: Launches[]
}

export const initialState: LaunchpadState = {
  launchpads: [],
  loading: false,
  error: null,
  currentPage: 0,
  itemsPerPage: 5, //default
  totalItems: 0,
  launches: []
};

