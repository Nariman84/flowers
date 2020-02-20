import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';
import { BasketService } from 'src/app/services/basket.service';
import { ApiService } from 'src/app/services/api.service';
import { PopupAboutAddedService } from 'src/app/services/popup-about-added.service';

@Component({
	selector: '[favorite-item]',
	templateUrl: './favorite-item.component.html',
	styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

	constructor(
		private routeToCard: Router,
		private basketService: BasketService,
		private stateFavoritesService: StateFavoritesService,
		private apiService: ApiService,
		private popupAboutAddedService: PopupAboutAddedService
	) { }

	public price: number;
	public count: number = 0;
	public innerWidth: number;
	public isDesktop: boolean;
	public isMobile: boolean;
	public isFavorite: boolean;
	public quantity: number = 0;
	private flowerInBasket: number;

	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	getMobileBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		this.routeToCard.navigate(['card-details', this.flower.productId]);
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

		if (innerWidth < 576) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	toggleProductInFavorites(e: Event) {
		this.isFavorite = !this.isFavorite;
		e.stopPropagation();
		this.stateFavoritesService.changeStateInFavorite(this.flower.productId);
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.isFavorite);
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

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price;
			this.isFavorite = this.flower.inFavorites;
			this.flowerInBasket = this.flower.inBasket;
		}

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

	}

}
