import { Component, OnInit, HostListener } from '@angular/core';
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

	public innerWidth: number;
	public isDesktop: boolean;
	public basketTitle: string = 'Ваша корзина пока что пуста';
	public basketProducts: any[] = [];
	public isEmptyBasket: boolean = true;
	private productsTotalCost: {[id:number]:number} = {};

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	getProductList() {
		this.apiService.getProductsInBasket()
			.subscribe(res => {
				this.basketProducts = res.details;

				if (res.details.length) {
					this.isEmptyBasket = false;
					this.basketTitle = 'Корзина';
				} else {
					this.isEmptyBasket = true;
					this.basketTitle = this.isDesktop ? 'Ваша корзина пока что пуста' : 'Ваша корзина пуста';
				}
			});
	}

	getGrandTotalCost() {
		this.basketService.getGrandTotalCost(this.productsTotalCost);
	}

	changeStateBasket() {
		if (!this.basketProducts.length) {
			this.isEmptyBasket = true;
			this.basketTitle = this.isDesktop ? 'Ваша корзина пока что пуста' : 'Ваша корзина пуста';
		} else {
			this.isEmptyBasket = false;
		}
	}

	ngOnInit() {

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.getProductList();

		this.basketService.updateTotalSum$.subscribe(value => {
			this.productsTotalCost[value.id] = value.price;
			this.getGrandTotalCost();
		});

		this.basketService.confirmDeletion$.subscribe(id => {
			for (let i = 0; i < this.basketProducts.length; i++) {
				if (this.basketProducts[i].productId === id) {
					this.basketProducts.splice(i, 1);
					delete this.productsTotalCost[id];
					break;
				}
			}
			this.changeStateBasket();
		});

		this.basketService.changeStateBasket$.subscribe(_ => {
			this.getProductList();
		});

		this.basketService.addRecentlyToBasket$.subscribe(_ => {
			this.getProductList();
		})
	}
}
