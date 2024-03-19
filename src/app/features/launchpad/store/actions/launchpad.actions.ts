import { createAction, props } from '@ngrx/store';
import { Launchpad, Launches } from '../../../../core/models/launchpad.model';


//launchpad actions
export const loadLaunchpads = createAction('[Launchpad] Load Launchpads');
export const loadLaunchpadsSuccess = createAction('[Launchpad] Load Launchpads Success', props<{ launchpads: Launchpad[] }>());
export const loadLaunchpadsFailure = createAction('[Launchpad] Load Launchpads Failure', props<{ error: any }>());

//pagination
export const setCurrentPage = createAction('[Launchpad] Set Current Page', props<{ currentPage: number }>());
export const setItemsPerPage = createAction('[Launchpad] Set Items Per Page', props<{ itemsPerPage: number }>());
export const setTotalItems = createAction('[Launchpad] Set Total Items', props<{ totalItems: number }>());

//launch actions
export const loadLaunches = createAction('[Launches] Load Launches', props<{ launchpadId: string }>());
export const loadLaunchesSuccess = createAction('[Launches] Load Launches Success', props<{ launches: Launches[]}>());
export const loadLaunchesFailure = createAction('[Launches] Load Launches Failure', props<{ error: any }>());

//search actions
export const searchLaunchpads = createAction('[Launchpad] Search Launchpads', props<{ query: string }>());
export const searchLaunchpadsSuccess = createAction('[Launchpad] Search Launchpads Success', props<{ launchpads: Launchpad[] }>());
export const searchLaunchpadsFailure = createAction('[Launchpad] Search Launchpads Failure', props<{ error: any }>());