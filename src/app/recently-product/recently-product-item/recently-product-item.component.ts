import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { BasketService } from 'src/app/services/basket.service';
import { Router } from '@angular/router';
import { PopupAboutAddedService } from 'src/app/services/popup-about-added.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'recently-product-item',
	templateUrl: './recently-product-item.component.html',
	styleUrls: ['./recently-product-item.component.css']
})
export class RecentlyProductItemComponent implements OnInit {

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
			this.basketService.onClickAddToBasket(res.productId, quantity, res.inBasket);
		});

		if (this.router.url.indexOf('basket') === -1) {
			this.popupAboutAddedService.onClickAddToBasket(this.flower);
		}
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
