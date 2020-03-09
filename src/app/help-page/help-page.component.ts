import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
	SwiperComponent,
	SwiperConfigInterface,
	SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import 'hammerjs';

@Component({
	selector: 'app-help-page',
	templateUrl: './help-page.component.html',
	styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	public innerWidth: number;
	public isDesktop: boolean;
	public isCarousel: boolean;

	public questions = [
		{
			link: 'make-an-order',
			icon: 'assets/icons/help/make-an-order.svg',
			title: 'Как сделать заказ'
		},
		{
			link: 'order-payment',
			icon: 'assets/icons/help/order-payment.svg',
			title: 'Как оплатить заказ'
		},
		{
			link: 'order-cancellation',
			icon: 'assets/icons/help/order-cancellation.svg',
			title: 'Как отменить заказ'
		},
		{
			link: 'send-message',
			icon: 'assets/icons/help/send-message.svg',
			title: 'Написать нам'
		}
	];

	@ViewChild(SwiperComponent, { static: false }) swiperComponentRef?: SwiperComponent;

	private pagination: SwiperPaginationInterface = {
		el: '.swiper-pagination',
		clickable: true,
		hideOnClick: false
	}

	public config: SwiperConfigInterface = {
		observer: true,
		a11y: true,
		direction: 'horizontal',
		slidesPerView: 'auto',
		spaceBetween: 14,
		keyboard: true,
		scrollbar: false,
		navigation: false,
		pagination: this.pagination,
		centeredSlides: true,
		passiveListeners: false
	};

	openQuestion(link: string) {
		this.router.navigate(['help', link]);
	}

	openCatalog() {
		this.router.navigate(['catalog']);
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

		if (innerWidth < 1200) {
			this.isCarousel = true;
		} else {
			this.isCarousel = false;
		}
	}

	onSwiperClick(e: Event) {
		let target = e.target as HTMLElement;
		while (!target.classList.contains('swiper-wrapper')) {
			if (target.classList.contains('swiper-slide-next')) {
				this.swiperComponentRef.directiveRef.nextSlide();
				return;
			} else if (target.classList.contains('swiper-slide-prev')) {
				this.swiperComponentRef.directiveRef.prevSlide();
				return;
			}
			target = target.parentElement;
		}
	}

	onIndexChange(index: number): void {
		this.openQuestion(this.questions[index].link);
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}