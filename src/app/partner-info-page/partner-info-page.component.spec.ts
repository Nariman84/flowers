import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerInfoPageComponent } from './partner-info-page.component';

describe('PartnerInfoPageComponent', () => {
  let component: PartnerInfoPageComponent;
  let fixture: ComponentFixture<PartnerInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
