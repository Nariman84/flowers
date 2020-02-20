import { Component, Input, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';
import { ApiService } from 'src/app/services/api.service';
import { PopupAboutAddedService } from 'src/app/services/popup-about-added.service';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

	constructor(
		private routeToCard: Router,
		private basketService: BasketService,
		private stateFavoritesService: StateFavoritesService,
		private apiService: ApiService,
		private popupAboutAddedService: PopupAboutAddedService
	) {}

	public count: number = 0;
	public innerWidth: number;
	public isDesktop: boolean;
	public price: number;
	public isFavorite: boolean;
	public isAddedToBasket: boolean = false;
	public quantity: number = 0;
	private flowerInBasket: number;

	@Input() isGrid: boolean;
	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	increase(): void {
		++this.count;
	}

	decrease(): void {
		if (this.count > 0) {
			--this.count;
		}
	}

	onChangeCount(e: Event) {
		this.count = +(e.target as HTMLInputElement).value;
		if (this.count < 0) {
			this.count = 0;
		}
	}

	changeQuantityProductInBasket(quantity: number) {
		let quantityInBasket = this.flower.inBasket + quantity;
		this.basketService.changeQuantityProductInBasket(this.flower.productId, quantityInBasket);
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или mobile)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
	}

	addToBasket(e: Event) {
		this.apiService.getProductById(this.flower.productId).subscribe(res => {
			this.flowerInBasket = res.inBasket;

			if (!this.count) {
				this.count = 1;
			}

			this.quantity = this.count + this.flowerInBasket;
			this.basketService.onClickAddToBasket(this.flower.productId, this.quantity, this.flowerInBasket);
		});

		this.popupAboutAddedService.onClickAddToBasket(this.flower);
	}

	toggleProductInFavorites(e: Event) {
		this.isFavorite = !this.isFavorite;
		e.stopPropagation();
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.isFavorite);
	}

	ngOnInit() {

		this.isFavorite = this.flower.inFavorites;

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}