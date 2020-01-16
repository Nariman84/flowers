import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
	selector: 'basket-product-list',
	templateUrl: './basket-product-list.component.html',
	styleUrls: ['./basket-product-list.component.css']
})
export class BasketProductListComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private basketService: BasketService
	) { }

	public productList: any = [];

	@Input() basketProducts;

	ngOnInit() {
		this.productList = this.basketProducts;
	}
}
