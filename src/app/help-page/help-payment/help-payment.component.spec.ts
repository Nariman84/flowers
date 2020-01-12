import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPaymentComponent } from './help-payment.component';

describe('HelpPaymentComponent', () => {
  let component: HelpPaymentComponent;
  let fixture: ComponentFixture<HelpPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
