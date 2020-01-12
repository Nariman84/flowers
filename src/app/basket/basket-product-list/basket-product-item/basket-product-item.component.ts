import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { ApiService } from 'src/app/services/api.service';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';

@Component({
	selector: 'basket-product-item',
	templateUrl: './basket-product-item.component.html',
	styleUrls: ['./basket-product-item.component.css']
})
export class BasketProductItemComponent implements OnInit {

	constructor(
		private routeToCard: Router,
		private basketService: BasketService,
		private apiService: ApiService,
		private stateFavoritesService: StateFavoritesService
	) { }

	public count: number = 0;
	public price: string;
	public innerWidth: number;
	public isDesktop: boolean;
	public inBasket: boolean = true;

	@Input() flower: any;

	getBackgroundStyle() {
		return `url(${this.flower.photo.fileName130}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
	}

	increase(): void {
		let quantity = ++this.count;
		this.changeTotalPrice(quantity);
	}

	decrease(): void {
		if (this.count > 0) {
			let quantity = --this.count;
			this.changeTotalPrice(quantity);
		}
	}

	onChangeCount(e:Event): void {
		let quantity = +(e.target as HTMLInputElement).value;
		this.changeTotalPrice(quantity);
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	deleteProdFromBasket() {
		this.inBasket = false;
	}

	cancelDeletion() {
		this.inBasket = true;
	}

	confirmDeletion() {
		this.apiService.removeProductFromBasket(this.flower.productId)
			.subscribe(res => {
				if (res.ok) {
					this.basketService.getProductsInBasket();
				}
			});
	}

	changeTotalPrice(quantity:number) {
		this.apiService.setQuantityToBuy(this.flower.productId, quantity)
			.subscribe(res => {
				if (res.ok) {
					this.basketService.changeQuantityProductInBasket();
					this.basketService.updateTotalSum();
				}
			});

	}

	toggleProductInFavorites(e: Event) {
		e.stopPropagation();
		this.apiService.getProductById(this.flower.productId)
			.subscribe(flower => {
				this.stateFavoritesService.changeStateInFavorite();
				this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, flower.inFavorites);
			}
		);
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
			this.count = this.flower.qty;
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}