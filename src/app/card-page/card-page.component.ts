import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { Flower } from '../shared/interfaces/interfaces';
import { RecentlyViewedService } from '../services/recently-viewed.service';
import { BasketService } from '../services/basket.service';

@Component({
	selector: 'card-page',
	templateUrl: './card-page.component.html',
	styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private recentlyViewedService: RecentlyViewedService,
		private basketService: BasketService
	) { }

	public flower: Flower;
	public price: string;
	public imageList: Array<{id: number, fileName130: string, fileName860: string}> = [];
	private mainImage: string;
	public backgroundStyle: string;
	public availability: string;
	public isActivePopup: boolean = false;
	public isAddedToBasket: boolean = false;
	public isVisibleCardHeader: boolean;

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

	slideConfig = {
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: false,
		infinite: false,
		vertical: true,
		verticalSwiping: true,
		respondTo: "#card-carousel",
		prevArrow: `<div class="arrow-up">
						<svg width="31" height="19" viewBox="0 0 31 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.6425 19L15.5 7.25641L27.3575 19L31 15.3846L15.5 2.71011e-06L-2.68993e-06 15.3846L3.6425 19Z" fill="#DCDCDC"/>
						</svg>
					</div>`,
		nextArrow: `<div class="arrow-down">
						<svg width="31" height="19" viewBox="0 0 31 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.6425 19L15.5 7.25641L27.3575 19L31 15.3846L15.5 2.71011e-06L-2.68993e-06 15.3846L3.6425 19Z" fill="#DCDCDC"/>
						</svg>
					</div>`
	};

	@ViewChild("protect", {static: false})
	protectRef: ElementRef;

	@HostListener('window:scroll', ['$event'])
	onScroll(e:Event) {
		if (this.protectRef.nativeElement.getBoundingClientRect().top <= 0 && !this.isVisibleCardHeader) {
			this.isVisibleCardHeader = true;
		} else if (this.protectRef.nativeElement.getBoundingClientRect().top > 0 && this.isVisibleCardHeader) {
			this.isVisibleCardHeader = false;
		}
	}


	choosePhoto(i: number, image: any) {
		this.mainImage = this.flower.photos[i].fileName860;
		this.getBackgroundStyle(this.mainImage);
	}

	getBackgroundStyle(mainImage: string) {
		this.backgroundStyle = `url(${mainImage}) 50% 50%/cover no-repeat`;
	}

	addToBasket(e: Event) {
		this.isActivePopup = true;
		this.isAddedToBasket = true;
		let quantity: number = this.flower.inBasket + 1;
		if (quantity > this.flower.pieces) {
			quantity = this.flower.pieces;
		}
		this.basketService.onClickAddToBasket(this.flower.productId, quantity);
	}

	getAvailabilityStatus(amountBouqets: number) {
		if (amountBouqets) {
			this.availability = 'В наличии';
		} else {
			this.availability = 'Отсутствует';
		}
	}

	closePopup() {
		this.isActivePopup = false;
	}

	ngOnInit() {
		this.route.data
			.subscribe(
				(data: Data) => {
					this.flower = data['product'];
					if (this.flower) {
						this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
						this.imageList = this.flower.photos.map(photo => {
							let objImages = {
								id: photo.id,
								fileName130: photo.fileName130,
								fileName860: photo.fileName860
							}
							return objImages;
						});
					}
					this.getAvailabilityStatus(this.flower.pieces);


					this.mainImage = this.flower.photos[0].fileName860;

					this.getBackgroundStyle(this.mainImage);
					this.recentlyViewedService.addViewedProduct(this.flower);
				}
			);


	}
}