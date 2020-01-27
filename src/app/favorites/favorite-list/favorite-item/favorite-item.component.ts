import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
	selector: '[favorite-item]',
	templateUrl: './favorite-item.component.html',
	styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

	constructor(
		private routeToCard: Router,
		private basketService: BasketService,
		private stateFavoritesService: StateFavoritesService
	) { }

	public price: number;
	public count: number = 0;
	public innerWidth: number;
	public isDesktop: boolean;
	public isMobile: boolean;
	public isFavorite: boolean;

	@Input() flower: Flower;
	@Output() removeProduct = new EventEmitter();

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
		this.count++;
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
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
		let quantity: number;
		if (this.count > 0 && this.isDesktop) {
			quantity = this.count + this.flower.inBasket;
		} else if (!this.isDesktop) {
			quantity = 1 + this.flower.inBasket;
		}
		this.basketService.onClickAddToBasket(this.flower.productId, quantity, this.flower.inBasket);
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price;
		}
		this.isFavorite = this.flower.inFavorites;

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
