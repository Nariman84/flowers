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

	public price: string;
	public count: number = 0;
	public innerWidth: number;
	public isDesktop: boolean;
	public isFavorite: boolean;

	@Input() flower: Flower;
	@Output() removeProduct = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
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

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	toggleProductInFavorites(e: Event) {
		this.isFavorite = !this.isFavorite;
		e.stopPropagation();
		this.stateFavoritesService.changeStateInFavorite(this.flower.productId);
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.isFavorite);
	}

	addToBasket(e: Event) {
		if (this.count > 0) {
			let quantity: number = this.count + this.flower.inBasket;
			this.basketService.onClickAddToBasket(this.flower.productId, quantity, this.flower.inBasket);
		}
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
		}
		this.isFavorite = this.flower.inFavorites;

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
