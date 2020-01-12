import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketProductListComponent } from './basket-product-list.component';

describe('BasketProductListComponent', () => {
  let component: BasketProductListComponent;
  let fixture: ComponentFixture<BasketProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
