import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionFeeComponent } from './tuition-fee.component';

describe('TuitionFeeComponent', () => {
  let component: TuitionFeeComponent;
  let fixture: ComponentFixture<TuitionFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuitionFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitionFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
