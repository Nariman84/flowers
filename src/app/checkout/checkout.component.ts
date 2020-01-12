import { Component, OnInit, Input } from '@angular/core';
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

	public price: string;
	public grandtotalCost: string;
	public discount: number = 0;
	public isOrderRoute: boolean;
	public code: string = '';

	@Input() basketProducts;

	goToCheckout() {
		this.router.navigate(['/order']);
	}

	ngOnInit() {
		this.price = this.basketProducts.totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ', 00';
		this.grandtotalCost = (this.basketProducts.totalSum - this.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ', 00';

		this.basketService._updateTotalSum.subscribe(_ => {
			this.apiService.getProductsInBasket()
				.subscribe(res => {
					this.grandtotalCost = res.totalSum;
				})
		});

		if (this.router.url === "/order") {
			this.isOrderRoute = true;
		}
		if (this.router.url === "/basket") {
			this.isOrderRoute = false;
		}
	}

}
