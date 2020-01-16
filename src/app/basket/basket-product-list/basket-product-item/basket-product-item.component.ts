import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
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
	public price: number;
	public innerWidth: number;
	public isDesktop: boolean;
	public inBasket: boolean = true;
	public quantity: number = 0;

	@Input() flower: any;
	@Output() confirmDeletionProd = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photo.fileName130}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
	}

	increase(): void {
		this.quantity = ++this.count;
		this.changeTotalPrice(this.quantity);
	}

	decrease(): void {
		if (this.count > 0) {
			this.quantity = --this.count;
			this.changeTotalPrice(this.quantity);
		}
	}

	onChangeCount(e:Event): void {
		this.quantity = +(e.target as HTMLInputElement).value;
		this.changeTotalPrice(this.quantity);
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
		this.basketService.removeProductFromBasket(this.flower.totalSum);
	}

	cancelDeletion() {
		this.inBasket = true;
		this.basketService.cancelDeletion(this.flower.totalSum);
	}

	confirmDeletion() {
		this.basketService.confirmDeletion(this.flower.productId);
	}

	changeTotalPrice(quantity:number) {
		this.price = this.flower.price * quantity;
		this.basketService.updateTotalSum(this.price, this.flower.productId);
		this.basketService.changeQuantityProductInBasket(this.flower.productId, quantity);
	}

	toggleProductInFavorites(e: Event) {
		e.stopPropagation();


		// this.apiService.getProductById(this.flower.productId)
		// 	.subscribe(flower => {
		// 		this.stateFavoritesService.changeStateInFavorite();
		// 		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, flower.inFavorites);
		// 	}
		// );
	}

	ngOnInit() {
		this.changeTotalPrice(this.flower.qty);

		if (this.flower) {
			this.price = this.flower.totalSum;
			this.count = this.flower.qty;
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}