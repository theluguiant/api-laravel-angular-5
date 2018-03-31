import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarShowComponent } from './car-show.component';

describe('CarShowComponent', () => {
  let component: CarShowComponent;
  let fixture: ComponentFixture<CarShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
