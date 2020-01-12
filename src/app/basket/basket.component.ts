import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BasketService } from '../services/basket.service';

@Component({
	selector: 'basket',
	templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private basketService: BasketService
	) { }

	public basketTitle: string = 'Ваша корзина пока что пуста';
	public basketProducts: any[] = [];
	public isEmptyBasket: boolean = true;

	updateProductList() {
		this.apiService.getProductsInBasket()
			.subscribe(res => {
				this.basketProducts = res;

				if (res.details.length) {
					this.isEmptyBasket = false;
					this.basketTitle = 'Корзина';
				} else {
					this.isEmptyBasket = true;
					this.basketTitle = 'Ваша корзина пока что пуста';
				}
			});
	}

	ngOnInit() {
		this.updateProductList();

		this.basketService._confirmDeletion.subscribe(_ => {
			this.updateProductList();
		});

		this.basketService._changeQuantity.subscribe(_ => {
			this.updateProductList();
		});
	}
}
