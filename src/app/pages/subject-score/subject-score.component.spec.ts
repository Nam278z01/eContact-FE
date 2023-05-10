import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectScoreComponent } from './subject-score.component';

describe('SubjectScoreComponent', () => {
  let component: SubjectScoreComponent;
  let fixture: ComponentFixture<SubjectScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
