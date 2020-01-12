import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipAgreementComponent } from './partnership-agreement.component';

describe('PartnershipAgreementComponent', () => {
  let component: PartnershipAgreementComponent;
  let fixture: ComponentFixture<PartnershipAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnershipAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
