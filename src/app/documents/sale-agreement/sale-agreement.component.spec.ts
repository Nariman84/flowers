import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOfferComponent } from './sale-agreement.component';

describe('PublicOfferComponent', () => {
  let component: PublicOfferComponent;
  let fixture: ComponentFixture<PublicOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
