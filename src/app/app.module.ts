import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LaunchpadEffects } from './features/launchpad/store/effects/launchpad.effects';
import { launchpadReducer } from './features/launchpad/store/reducers/launchpad.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({ launchpads: launchpadReducer }), // Define your initial state here
    EffectsModule.forRoot([LaunchpadEffects]),
    MatCardModule,
    MatIconModule,
    RouterModule,
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: true
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

