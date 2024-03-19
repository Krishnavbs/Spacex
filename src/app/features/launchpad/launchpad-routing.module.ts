// src/app/features/launchpad/pages/launchpad-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesComponent } from './pages/launches/launches.component';
import { LaunchpadListComponent } from './pages/launchpad-list/launchpad-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'launchpad', pathMatch: 'full' },
  { path: 'launchpad', component: LaunchpadListComponent },
  { path: 'launches/:id', component: LaunchesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaunchpadRoutingModule { }
