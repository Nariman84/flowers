import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketProductItemComponent } from './basket-product-item.component';

describe('BasketProductItemComponent', () => {
  let component: BasketProductItemComponent;
  let fixture: ComponentFixture<BasketProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
