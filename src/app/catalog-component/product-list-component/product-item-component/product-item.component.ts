import { Component, Input, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

	constructor(
		private routeToCard: Router,
		private basketService: BasketService,
		private stateFavoritesService: StateFavoritesService
	) {}

	public count: number = 0;
	public innerWidth: number;
	public isDesktop: boolean;
	public price: string;
	public isFavorite: boolean = false;

	@Input() isGrid: boolean;
	@Input() flower: Flower;

	@Output() onClickAddToBasket = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
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

	openCardThisFlower(e: Event) {
		let target = e.target as HTMLElement;
		this.routeToCard.navigate(['card-details', target.id]);
	}

	addToBasket(e: Event) {
		if (this.count > 0) {
			let quantity: number = this.count + this.flower.inBasket;
			if (quantity > this.flower.pieces) {
				quantity = this.flower.pieces;
			}
			this.basketService.onClickAddToBasket(this.flower.productId, quantity);

			this.onClickAddToBasket.emit(this.flower);
			console.log('product-item')
		}


	}

	toggleProductInFavorites(e: Event) {
		e.stopPropagation();
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.flower.inFavorites);
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}