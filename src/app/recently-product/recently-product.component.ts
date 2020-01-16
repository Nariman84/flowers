import { Component, OnInit } from '@angular/core';
import { RecentlyViewedService } from '../services/recently-viewed.service';
import { Flower } from '../shared/interfaces/interfaces';

@Component({
	selector: 'recently-product',
	templateUrl: './recently-product.component.html',
	styleUrls: ['./recently-product.component.css']
})
export class RecentlyProductComponent implements OnInit {

	constructor(private recentlyViewedService: RecentlyViewedService) { }

	recentlyProducts: Flower[] = [];

	ngOnInit() {
		let recentlyProd = this.recentlyViewedService.getViewedProduct();

		for (let id in recentlyProd) {
			this.recentlyProducts.push(recentlyProd[id])
		}
	}
}
