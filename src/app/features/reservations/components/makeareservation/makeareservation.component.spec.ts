import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeareservationComponent } from './makeareservation.component';

describe('MakeareservationComponent', () => {
  let component: MakeareservationComponent;
  let fixture: ComponentFixture<MakeareservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeareservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeareservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
