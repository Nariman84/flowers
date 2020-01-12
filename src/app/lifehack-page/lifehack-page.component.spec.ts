import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifehackPageComponent } from './lifehack-page.component';

describe('LifehackPageComponent', () => {
  let component: LifehackPageComponent;
  let fixture: ComponentFixture<LifehackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifehackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifehackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
