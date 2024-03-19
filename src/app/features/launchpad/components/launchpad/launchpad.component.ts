import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Launchpad } from '../../../../core/models/launchpad.model';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent {
  @Input() launchpad!: Launchpad;

  constructor( private router: Router) {}
  
  navigateToLaunches(launchpadId: string): void {
    this.router.navigate(['/launches', launchpadId]);
  }
}
