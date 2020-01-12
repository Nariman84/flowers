import { Component, OnInit, Input, HostListener } from '@angular/core';
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
	public isFavorite: boolean = false;

	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
	}

	increase(): void {
		if (this.count < this.flower.pieces) {
			this.count++;
		}
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
		}
	}

	onChangeCount() {
		if (this.count < 0) {
			this.count = 0;
		}

		if (this.count > this.flower.pieces) {
			this.count = this.flower.pieces;
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
		e.stopPropagation();
		this.stateFavoritesService.changeStateInFavorite();
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.flower.inFavorites);
	}

	addToBasket(e: Event) {
		if (this.count > 0) {
			let quantity: number = this.count + this.flower.inBasket;
			if (quantity > this.flower.pieces) {
				quantity = this.flower.pieces;
			}
			this.basketService.onClickAddToBasket(this.flower.productId, quantity);
		}
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
