import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadDetailsComponent } from './launchpad-details.component';

describe('LaunchpadDetailsComponent', () => {
  let component: LaunchpadDetailsComponent;
  let fixture: ComponentFixture<LaunchpadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchpadDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchpadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
