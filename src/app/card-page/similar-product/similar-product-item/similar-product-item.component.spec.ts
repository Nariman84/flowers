import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProductItemComponent } from './similar-product-item.component';

describe('SimilarProductItemComponent', () => {
  let component: SimilarProductItemComponent;
  let fixture: ComponentFixture<SimilarProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
