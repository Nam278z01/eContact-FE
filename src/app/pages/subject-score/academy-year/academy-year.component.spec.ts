import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyYearComponent } from './academy-year.component';

describe('AcademyYearComponent', () => {
  let component: AcademyYearComponent;
  let fixture: ComponentFixture<AcademyYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademyYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademyYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
