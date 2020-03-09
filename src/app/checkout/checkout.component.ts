import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	constructor(
		private router: Router,
		private basketService: BasketService,
		private apiService: ApiService
	) { }

	public price: number = 0;
	public discount: number = 0;
	public isOrderRoute: boolean;
	public code: string = '';
	public grandTotalCost: number;
	public amountProd: number;
	public isSendPromo: boolean;
	public basketProducts;

	@Output() applyPromoCode = new EventEmitter();

	goToCheckout() {
		this.router.navigate(['/order']);
	}

	applyCode() {
		if (this.code) {
			this.isSendPromo = true;
			this.applyPromoCode.emit(this.code);
		}
	}

	getProductInfo() {
		this.apiService.getProductsInBasket()
			.subscribe(res => {
				this.amountProd = res.details.length;
				this.price = res.totalSum;
				this.grandTotalCost = this.price - this.discount;
			});
	}

	ngOnInit() {
		this.getProductInfo();

		if (this.router.url === "/order") {
			this.isOrderRoute = true;
		}

		if (this.router.url === "/basket") {
			this.isOrderRoute = false;

			this.basketService.getGrandTotalCost$.subscribe(value => {
				this.price = value;
				this.grandTotalCost = (this.price - this.discount) || 0;
			});
		}

		this.basketService.setAmountInBasket$.subscribe(data => {
			let isRemove = data;
			if (isRemove) {
				this.amountProd--;
			} else {
				this.amountProd++;
			}
		});
	}
}
