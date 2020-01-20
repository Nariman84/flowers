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
	private productsTotalCost: {[id:number]:number} = {};

	getProductList() {
		this.apiService.getProductsInBasket()
			.subscribe(res => {
				this.basketProducts = res.details;

				if (res.details.length) {
					this.isEmptyBasket = false;
					this.basketTitle = 'Корзина';
				} else {
					this.isEmptyBasket = true;
					this.basketTitle = 'Ваша корзина пока что пуста';
				}
			});
	}

	getGrandTotalCost() {
		this.basketService.getGrandTotalCost(this.productsTotalCost);
	}

	ngOnInit() {
		this.getProductList();


		this.basketService.updateTotalSum$.subscribe(value => {
			this.productsTotalCost[value.id] = value.price;
			this.getGrandTotalCost();
		});

		this.basketService.confirmDeletion$.subscribe(id => {
			for (let i = 0; i < this.basketProducts.length; i++) {
				if (this.basketProducts[i].productId === id) {
					this.apiService.removeProductFromBasket(id).subscribe();
					this.basketProducts.splice(i, 1);
					delete this.productsTotalCost[id];
					this.getGrandTotalCost();
					break;
				}
			}

			if (!this.basketProducts.length) {
				this.isEmptyBasket = true;
				this.basketTitle = 'Ваша корзина пока что пуста';
				this.basketService.clearAmountInHeader();
			}
		});
	}
}
