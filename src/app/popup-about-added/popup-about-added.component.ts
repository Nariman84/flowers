import { Component, OnInit, HostListener } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router, Event, NavigationEnd } from '@angular/router';
import { PopupAboutAddedService } from '../services/popup-about-added.service';

@Component({
	selector: 'popup-about-added',
	templateUrl: './popup-about-added.component.html',
	styleUrls: ['./popup-about-added.component.css']
})
export class PopupAboutAddedComponent implements OnInit {

	constructor(
		private router: Router,
		private popupAboutAddedService: PopupAboutAddedService
	) { }

	public price: number;
	public innerWidth: number;
	public isDesktop: boolean;
	public flower: Flower;
	public isVisiblePopup: boolean;
	public isCatalog: boolean;
	private timerId: any;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	goToBasket() {
		this.router.navigateByUrl('/basket');
	}

	closePopup() {
		this.popupAboutAddedService.closePopup();
		this.isVisiblePopup = false;
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

	getCatalogPage() {
		if (this.router.url.indexOf('catalog') !== -1) {
			this.isCatalog = true;
		} else {
			this.isCatalog = false;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.popupAboutAddedService.onClickAddToBasket$.subscribe(res => {
			if (this.timerId) {
				clearInterval(this.timerId);
			}
			this.isVisiblePopup = true;
			this.flower = res;
			this.price = res.price;

			this.timerId = setTimeout(() => {
				this.isVisiblePopup = false;
			}, 3000);
		});

		this.getCatalogPage();

		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.getCatalogPage();
			}
		});
	}
}