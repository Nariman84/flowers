import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAboutAddedComponent } from './popup-about-added.component';

describe('PopupAboutAddedComponent', () => {
  let component: PopupAboutAddedComponent;
  let fixture: ComponentFixture<PopupAboutAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAboutAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAboutAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
