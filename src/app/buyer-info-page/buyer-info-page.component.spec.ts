import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerInfoPageComponent } from './buyer-info-page.component';

describe('BuyerInfoPageComponent', () => {
  let component: BuyerInfoPageComponent;
  let fixture: ComponentFixture<BuyerInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
