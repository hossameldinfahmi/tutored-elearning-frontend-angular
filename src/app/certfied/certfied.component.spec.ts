import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertfiedComponent } from './certfied.component';

describe('CertfiedComponent', () => {
  let component: CertfiedComponent;
  let fixture: ComponentFixture<CertfiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertfiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertfiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
