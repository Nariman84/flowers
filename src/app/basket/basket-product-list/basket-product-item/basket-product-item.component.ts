import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
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
		private router: Router,
		private basketService: BasketService,
		private apiService: ApiService,
		private stateFavoritesService: StateFavoritesService
	) { }

	public count: number = 0;
	public price: number;
	public innerWidth: number;
	public isDesktop: boolean;
	public isTablet: boolean;
	public inBasket: boolean = true;
	public quantity: number = 0;
	public isFavorite: boolean;

	@Input() flower: any;
	@Output() confirmDeletionProd = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photo.fileName130}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e) {
		let target = e.target as HTMLElement;
		this.router.navigate(['card-details', target.id]);
	}

	increase(): void {
		this.quantity = ++this.count;
		this.changeTotalPrice(this.count);
	}

	decrease(): void {
		if (this.count > 0) {
			this.quantity = --this.count;
			this.changeTotalPrice(this.quantity);
		}
	}

	onChangeCount(e): void {
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

		if (innerWidth < 992) {
			this.isTablet = true;
		} else {
			this.isTablet = false;
		}
	}

	deleteProdFromBasket() {
		this.inBasket = false;
		this.basketService.deleteProdFromBasket();
		this.changeTotalPrice(this.quantity);
	}

	cancelDeletion() {
		this.inBasket = true;
		this.basketService.cancelDeletion();
		this.changeTotalPrice(this.count);
	}

	confirmDeletion() {
		this.basketService.confirmDeletion(this.flower.productId);
		this.inBasket = true;
	}

	changeTotalPrice(quantity:number) {
		if (this.inBasket) {
			this.price = this.flower.price * quantity;
		} else {
			this.price = 0;
		}
		this.basketService.updateTotalSum(this.price, this.flower.productId);
		this.basketService.changeQuantityProductInBasket(this.flower.productId, quantity);
	}

	toggleProductInFavorites(e) {
		e.stopPropagation();
		this.isFavorite = !this.isFavorite;
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.isFavorite);
	}

	getInfoAboutProduct(id: number) {
		this.apiService.getProductById(id).subscribe(data => {
			this.isFavorite = data.inFavorites;
		});
	}

	ngOnInit() {

		this.getInfoAboutProduct(this.flower.productId);
		this.changeTotalPrice(this.flower.qty);

		if (this.flower) {
			this.price = this.flower.totalSum;
			this.count = this.flower.qty;
		}
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.router.events.subscribe((event: Event) => {
			if ((event instanceof NavigationStart) && (this.router.url.indexOf('basket') !== -1) && !this.inBasket) {
				this.confirmDeletion();
			}
		});
	}
}