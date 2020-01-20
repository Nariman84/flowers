import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-partner-info-page',
	templateUrl: './partner-info-page.component.html',
	styleUrls: ['./partner-info-page.component.css']
})
export class PartnerInfoPageComponent implements OnInit {

	constructor(private router: Router) { }

	public smallBanner: string = 'assets/img/partner/Banner_partner_small.svg';
	public largeBanner: string = 'assets/img/partner/Banner_partner.svg';
	public bannerTitle: string = 'Нашим<br/> партнерам';
	public innerWidth: number;
	public isDesktop: boolean;

	public reasonCards = [
		{
			icon: 'assets/icons/partner/stall.svg',
			background: 'url(assets/img/partner/partner-block-1_card-1.svg)',
			backgroundSmall: 'url(assets/img/partner/partner-block-1_card-1_small.svg)',
			title: 'партнерская витрина',
			text: 'Бесплатная онлайн-витрина для выкладки товара.'
		},
		{
			icon: 'assets/icons/partner/hand.svg',
			background: 'url(assets/img/partner/partner-block-1_card-2.svg)',
			backgroundSmall: 'url(assets/img/partner/partner-block-1_card-2_small.svg)',
			title: 'генерация трафика',
			text: 'Мы предоставляем вам клиентов - вы увеличиваете свои продажи.'
		},
		{
			icon: 'assets/icons/partner/rocket.svg',
			background: 'url(assets/img/partner/partner-block-1_card-3.svg)',
			backgroundSmall: 'url(assets/img/partner/partner-block-1_card-3_small.svg)',
			title: 'легко начать',
			text: 'Наши услуги для вас полностью бесплатны. Сайт получает комиссию за каждый проданный вами букет.'
		}
	];

	public advCards = [
		{
			icon: 'assets/icons/partner/adv_icon-1.svg',
			title: 'Увеличение выручки',
			text: 'Вы получите новых клиентов, новые заказы, новый источник дохода.'
		},
		{
			icon: 'assets/icons/partner/adv_icon-2.svg',
			title: 'Без вложений',
			text: 'Регистрация и работа на сайте абсолютно бесплатны.'
		},
		{
			icon: 'assets/icons/partner/adv_icon-3.svg',
			title: 'Гарантия оплаты',
			text: 'Все товары оплачиваются клиентом во время заказа.'
		},
		{
			icon: 'assets/icons/partner/adv_icon-4.svg',
			title: 'Быстрая регистрация',
			text: 'Регистрация на сайте займет всего 3 минуты'
		},
		{
			icon: 'assets/icons/partner/adv_icon-5.svg',
			title: 'Удобный интерфейс',
			text: 'После регистрации просто добавьте на сайт свои товары.'
		}
	];

	openPartnership() {
		this.router.navigate(['partnership'])
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
