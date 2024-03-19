import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LaunchpadComponent } from './launchpad.component';
import { Launchpad } from '../../../../core/models/launchpad.model';
import { MatCardModule } from '@angular/material/card';

describe('LaunchpadComponent', () => {
  let component: LaunchpadComponent;
  let fixture: ComponentFixture<LaunchpadComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchpadComponent],
       imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchpadComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to launches', () => {
    const launchpadId = '1';
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToLaunches(launchpadId);
    expect(navigateSpy).toHaveBeenCalledWith(['/launches', launchpadId]);
  });

  it('should render launchpad information', () => {
    const mockLaunchpad: Launchpad = {
      id: '1',
      name: 'Launchpad 1',
      location: { name: 'Location 1', region: 'Region 1' },
      launches: [],
      image: 'path/to/image'
    };
    component.launchpad = mockLaunchpad;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.mat-mdc-card-title').textContent).toContain('Launchpad 1');
    expect(compiled.querySelector('.mat-mdc-card-content').textContent).toContain('Region: Region 1');
  });
});
