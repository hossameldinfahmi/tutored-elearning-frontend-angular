import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotCertfiedComponent } from './not-certfied.component';

describe('NotCertfiedComponent', () => {
  let component: NotCertfiedComponent;
  let fixture: ComponentFixture<NotCertfiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotCertfiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotCertfiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
