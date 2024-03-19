import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Launches } from '../../../../core/models/launchpad.model';
import { SpaceXFacade } from '../../spacex.facade';


@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {
  launchpadId!: string;
  launches: Launches[] = []

  constructor(private route: ActivatedRoute, private store: Store, private spaceXFacade: SpaceXFacade) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.spaceXFacade.loadLaunches(id);
      }
    });
    this.spaceXFacade.launches$.subscribe((launches: Launches[]) => {
      this.launches = launches;
    });
  }
}
