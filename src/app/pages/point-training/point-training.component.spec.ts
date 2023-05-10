import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTrainingComponent } from './point-training.component';

describe('PointTrainingComponent', () => {
  let component: PointTrainingComponent;
  let fixture: ComponentFixture<PointTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
