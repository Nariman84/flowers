import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOrderComponent } from './help-order.component';

describe('HelpOrderComponent', () => {
  let component: HelpOrderComponent;
  let fixture: ComponentFixture<HelpOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
