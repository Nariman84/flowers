import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

	public smallBanner: string = 'assets/img/help/Banner_help_small.svg';
	public largeBanner: string = 'assets/img/help/Banner_help.svg';
	public bannerTitle: string = 'Часто задаваемые<br/> вопросы';
	public innerWidth: number;
	public isDesktop: boolean;

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

	slideConfig = {
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					centerMode: true,
					arrows: false,
					dots: true,
					dotsClass: 'help-dots',
					customPaging: () => "<div class='help-dot'><div>"
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					centerMode: true,
					arrows: false,
					swipeToSlide: true,
					dots: true,
					dotsClass: 'help-dots',
					customPaging: () => "<div class='help-dot'><div>"
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					centerMode: true,
					arrows: false,
					dots: true,
					dotsClass: 'help-dots',
					customPaging: () => "<div class='help-dot'><div>"
				}
			}
		]
	};

	trackByFn(index, item) {
		return index
	}

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
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
