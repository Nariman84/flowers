import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-partner-info-page',
	templateUrl: './partner-info-page.component.html',
	styleUrls: ['./partner-info-page.component.css']
})
export class PartnerInfoPageComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/partner/Banner_partner_small.svg';
	public largeBanner: string = 'assets/img/partner/Banner_partner.svg';
	public bannerTitle: string = 'Нашим<br/> партнерам';

	public reasonCards = [
		{
			icon: 'assets/icons/partner/stall.svg',
			background: 'url(assets/img/partner/partner-block-1_card-1.png)',
			title: 'партнерская витрина',
			text: 'Бесплатная онлайн-витрина для выкладки товара.'
		},
		{
			icon: 'assets/icons/partner/hand.svg',
			background: 'url(assets/img/partner/partner-block-1_card-2.png)',
			title: 'генерация трафика',
			text: 'Мы предоставляем вам клиентов - вы увеличиваете свои продажи.'
		},
		{
			icon: 'assets/icons/partner/rocket.svg',
			background: 'url(assets/img/partner/partner-block-1_card-3.png)',
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

	ngOnInit() { }

}
