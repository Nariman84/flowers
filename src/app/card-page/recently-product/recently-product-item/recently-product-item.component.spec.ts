import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyProductItemComponent } from './recently-product-item.component';

describe('RecentlyProductItemComponent', () => {
  let component: RecentlyProductItemComponent;
  let fixture: ComponentFixture<RecentlyProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
