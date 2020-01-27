import { Component, OnInit, HostListener } from '@angular/core';
import { RecentlyViewedService } from '../services/recently-viewed.service';
import { Flower } from '../shared/interfaces/interfaces';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
	selector: 'recently-product',
	templateUrl: './recently-product.component.html',
	styleUrls: ['./recently-product.component.css']
})
export class RecentlyProductComponent implements OnInit {

	constructor(private recentlyViewedService: RecentlyViewedService) { }

	recentlyProducts: Flower[] = [];
	public innerWidth: number;
	public isDesktop: boolean;

	public config: SwiperConfigInterface = {
		a11y: true,
		direction: 'horizontal',
		slidesPerView: 'auto',
		spaceBetween: 16,
		keyboard: true,
		mousewheel: true,
		scrollbar: false,
		navigation: false,
		pagination: false
	};

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
		let recentlyProd = this.recentlyViewedService.getViewedProduct();

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		for (let id in recentlyProd) {
			this.recentlyProducts.push(recentlyProd[id])
		}
	}
}
