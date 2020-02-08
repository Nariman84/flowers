import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Data, ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Flower } from '../shared/interfaces/interfaces';
import { RecentlyViewedService } from '../services/recently-viewed.service';
import { BasketService } from '../services/basket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardPopupComponent } from './card-popup/card-popup.component';
import { CardService } from '../services/card.service';

import {
	SwiperComponent,
	SwiperDirective,
	SwiperConfigInterface,
	SwiperScrollbarInterface,
	SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { StateFavoritesService } from '../services/state-favorites.service';

@Component({
	selector: 'card-page',
	templateUrl: './card-page.component.html',
	styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private recentlyViewedService: RecentlyViewedService,
		private basketService: BasketService,
		private modalService: NgbModal,
		private cardService: CardService,
		private stateFavoritesService: StateFavoritesService
	) { }

	public flower: Flower;
	public price: number;
	public imageList: Array<{id: number, fileName130: string, fileName860: string}> = [];
	private mainImage: string;
	public backgroundStyle: string;
	public availability: string;
	public isActivePopup: boolean = false;
	public isAddedToBasket: boolean = false;
	public isVisibleCardHeader: boolean;
	public isVisibleCardFooter: boolean;
	private innerWidth: number;
	public isDesktop: boolean;
	public isSlide: boolean;
	public isIndent: boolean;
	public isFavorite: boolean;

	public instructionSteps: Array<{stepName: string, srcImg: string, text: string}> = [
		{
			stepName: 'collecting-order',
			srcImg: 'assets/icons/card/collecting-order.svg',
			text: 'Наш флорист собирает ваш заказ'
		},
		{
			stepName: 'sending-photo',
			srcImg: 'assets/icons/card/sending-photo.svg',
			text: 'Мы присылаем вам фото'
		},
		{
			stepName: 'delivery',
			srcImg: 'assets/icons/card/delivery.svg',
			text: 'Доставим букет прямо к вам'
		},
		{
			stepName: 'review',
			srcImg: 'assets/icons/card/review.svg',
			text: 'Можете оставить отзыв о работе флориста'
		}
	];

	public config: SwiperConfigInterface = {
		observer: true,
		a11y: true,
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 36,
		keyboard: true,
		mousewheel: true,
		scrollbar: false,
		navigation: {
			nextEl: '.next-photo',
			prevEl: '.prev-photo',
			hiddenClass: 'hidden-swiper-btn',
			disabledClass: 'disabled-swiper-btn'
		},
		watchOverflow: true,
		breakpoints: {
			1200: {
				spaceBetween: 28
			}
		}
	};

	private pagination: SwiperPaginationInterface = {
		el: '.swiper-pagination',
		clickable: true,
		hideOnClick: false
	}

	public configMobile: SwiperConfigInterface = {
		observer: true,
		a11y: true,
		direction: 'horizontal',
		slidesPerView: 1,
		keyboard: true,
		mousewheel: true,
		scrollbar: false,
		navigation: false,
		watchOverflow: true,
		pagination: this.pagination,
		freeMode: true,
		freeModeSticky: true
	};

	@ViewChild("protect", {static: false})
	protectRef: ElementRef;

	@ViewChild("description", {static: false})
	descRef: ElementRef;

	@HostListener('window:scroll', ['$event'])
	onScroll(e:Event) {
		if (this.protectRef.nativeElement.getBoundingClientRect().top <= 0 && !this.isVisibleCardHeader) {
			this.isVisibleCardHeader = true;
		} else if (this.protectRef.nativeElement.getBoundingClientRect().top > 0 &&	this.isVisibleCardHeader) {
			this.isVisibleCardHeader = false;
		}

		if (this.descRef.nativeElement.getBoundingClientRect().top <= 0 && !this.isVisibleCardFooter) {
			this.isVisibleCardFooter = true;
		} else if (this.descRef.nativeElement.getBoundingClientRect().top > 0 && this.isVisibleCardFooter) {
			this.isVisibleCardFooter = false;
		}
	}

	choosePhoto(i: number) {
		this.mainImage = this.flower.photos[i].fileName860;
		this.getBackgroundStyle(this.mainImage);
	}

	getBackgroundStyle(mainImage: string) {
		this.backgroundStyle = `url(${mainImage}) 50% 50%/cover no-repeat`;
	}

	addToBasket(e: Event) {
		const modalRef = this.modalService.open(CardPopupComponent);
		modalRef.componentInstance.flower = this.flower;
		modalRef.componentInstance.price = this.price;

		this.isAddedToBasket = true;
		let quantity: number = this.flower.inBasket + 1;
		this.basketService.onClickAddToBasket(this.flower.productId, quantity, this.flower.inBasket);
	}

	toggleProductInFavorites(e:Event) {
		this.isFavorite = !this.isFavorite;
		this.stateFavoritesService.toggleProductInFavorites(this.flower.productId, this.isFavorite);
	}

	getAvailabilityStatus(amountBouqets: number) {
		if (amountBouqets) {
			this.availability = 'В наличии';
		} else {
			this.availability = 'Отсутствует';
		}
	}

	getStateInFavorite(state: boolean) {
		this.isFavorite = state;
	}

	openCatalog() {
		this.router.navigate(['catalog']);
	}

	getPhotos() {
		this.activatedRoute.data.subscribe((data: Data) => {
				this.flower = data['product'];

				this.getStateInFavorite(this.flower.inFavorites);

				this.getAllFlowerPhoto();

				this.getAvailabilityStatus(this.flower.pieces);

				this.mainImage = this.flower.photos[0].fileName860;

				this.getBackgroundStyle(this.mainImage);
			}
		);
	}

	getAllFlowerPhoto() {
		this.price = this.flower.price;
		this.imageList = this.flower.photos.map(photo => {
			let objImages = {
				id: photo.id,
				fileName130: photo.fileName130,
				fileName860: photo.fileName860
			}
			return objImages;
		});
		this.changeIndent(this.imageList);
	}

	changeIndent(imageList) {
		if (imageList.length > 3) {
			this.isIndent = true;
		} else {
			this.isIndent = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}

		if (innerWidth < 992) {
			this.isSlide = true;
		} else {
			this.isSlide = false;
		}
	}

	getMobileBackgroundStyle(image) {
		return `url(${image.fileName640}) 50% 50%/cover no-repeat`;
	}

	ngOnInit() {
		this.getPhotos();

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.router.events.subscribe((event: Event) => {
			if ((event instanceof NavigationEnd) && (this.router.url.indexOf('card-details') === -1)) {
				this.recentlyViewedService.addViewedProduct(this.flower);
			}
		});
	}
}