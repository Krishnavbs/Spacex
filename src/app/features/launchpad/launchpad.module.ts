import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LaunchpadRoutingModule } from './launchpad-routing.module';
import { LaunchpadComponent } from './components/launchpad/launchpad.component';
import { LaunchpadDetailsComponent } from './components/launchpad-details/launchpad-details.component';
import { SpaceXService } from '../../core/services/space-x.service';
import { LaunchpadEffects } from './store/effects/launchpad.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { launchpadReducer } from './store/reducers/launchpad.reducer';
import { LaunchpadListComponent } from './pages/launchpad-list/launchpad-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; 
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LaunchesComponent } from './pages/launches/launches.component';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LaunchpadComponent,
    LaunchpadDetailsComponent,
    LaunchpadListComponent,
    LaunchesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LaunchpadRoutingModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    StoreModule.forFeature('launchpad', launchpadReducer),
    EffectsModule.forFeature([LaunchpadEffects])
  ],
  providers: [
    SpaceXService,
    LaunchpadEffects
  ]
})
export class LaunchpadModule { }
