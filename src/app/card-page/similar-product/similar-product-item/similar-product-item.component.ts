import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { PopupAboutAddedService } from 'src/app/services/popup-about-added.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'similar-product-item',
	templateUrl: './similar-product-item.component.html',
	styleUrls: ['./similar-product-item.component.css']
})
export class SimilarProductItemComponent implements OnInit {

	constructor(
		private basketService: BasketService,
		private router: Router,
		private apiService: ApiService,
		private popupAboutAddedService: PopupAboutAddedService
	) { }

	@Input() flower: Flower;
	public innerWidth: number;
	public isDesktop: boolean;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		this.router.navigate(['card-details', this.flower.productId]);
		if (this.router.url.indexOf('card-details') !== -1) {
			window.scroll(0,0);
		}
	}

	addToBasket(e: Event) {
		let quantity: number;
		this.apiService.getProductById(this.flower.productId).subscribe(res => {
			quantity = res.inBasket + 1;

			this.basketService.onClickAddToBasket(this.flower.productId, quantity, this.flower.inBasket);
			this.basketService.addRecentlyToBasket();
		});

		this.popupAboutAddedService.onClickAddToBasket(this.flower);
	}

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

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}