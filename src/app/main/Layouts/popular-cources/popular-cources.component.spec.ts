import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCourcesComponent } from './popular-cources.component';

describe('PopularCourcesComponent', () => {
  let component: PopularCourcesComponent;
  let fixture: ComponentFixture<PopularCourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
