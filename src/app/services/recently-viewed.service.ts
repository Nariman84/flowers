import { Injectable } from '@angular/core';
import { Flower } from '../shared/interfaces/interfaces';

@Injectable()
export class RecentlyViewedService {

	constructor() { }

	// public RecentlyViewedProducts: Flower[] = [];
	private recentlyViewedProductsObj: {[id:number]:Flower} = {};

	addViewedProduct(product: Flower): void {
		// this.RecentlyViewedProducts.push(product);

		this.recentlyViewedProductsObj[product.productId] = product;
	}

	getViewedProduct(): {[id:number]:Flower} {
		// for (let id in this.RecentlyViewedProductsObj) {
		// 	this.RecentlyViewedProducts.push(this.RecentlyViewedProductsObj[id])
		// }
		return this.recentlyViewedProductsObj;
	}
}
