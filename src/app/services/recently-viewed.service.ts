import { Injectable } from '@angular/core';
import { Flower } from '../shared/interfaces/interfaces';

@Injectable()
export class RecentlyViewedService {

	constructor() { }

	public RecentlyViewedProducts: Flower[] = [];

	addViewedProduct(product: Flower): void {
		this.RecentlyViewedProducts.push(product);
	}

	getViewedProduct(): Flower[] {
		return this.RecentlyViewedProducts;
	}
}
