import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetasignupComponent } from './betasignup.component';

describe('BetasignupComponent', () => {
  let component: BetasignupComponent;
  let fixture: ComponentFixture<BetasignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetasignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetasignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
