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
	public grandTotalCost: number = 0;
	public amountProd: number;
	public isSendPromo: boolean;

	@Output() applyPromoCode = new EventEmitter();

	@Input() basketProducts;

	goToCheckout() {
		this.router.navigate(['/order'], {
			state: {
				price: this.price,
				grandTotalCost: this.grandTotalCost,
				amountProd: this.basketProducts.length
			}
		});
	}

	applyCode() {
		if (this.code) {
			this.isSendPromo = true;
			this.applyPromoCode.emit(this.code);
		}
	}

	ngOnInit() {
		if (this.router.url === "/order") {
			this.isOrderRoute = true;
			this.amountProd = window.history.state.amountProd || 0;
			this.price = window.history.state.price || 0;
			this.grandTotalCost = window.history.state.grandTotalCost || 0;
		}

		if (this.router.url === "/basket") {
			this.isOrderRoute = false;

			this.amountProd = this.basketProducts.length || 0;
			this.basketService.getGrandTotalCost$.subscribe(value => {
				this.price = value || 0;
				this.grandTotalCost = (this.price - this.discount) || 0;
			});

			this.basketService.toggleRemoveProductFromBasket$.subscribe(data => {
				if (data.isRemove) {
					this.price -= data.totalSum;
					this.grandTotalCost = (this.price - this.discount) || 0;
				} else {
					this.price += data.totalSum;
					this.grandTotalCost = (this.price - this.discount) || 0;
				}
			})

		}


	}
}
