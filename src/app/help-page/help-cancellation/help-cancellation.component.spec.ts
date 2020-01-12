import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCancellationComponent } from './help-cancellation.component';

describe('HelpCancellationComponent', () => {
  let component: HelpCancellationComponent;
  let fixture: ComponentFixture<HelpCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
