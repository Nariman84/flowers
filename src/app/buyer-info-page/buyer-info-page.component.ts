import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-buyer-info-page',
	templateUrl: './buyer-info-page.component.html',
	styleUrls: ['./buyer-info-page.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class BuyerInfoPageComponent implements OnInit {

	constructor(private router: Router) { }

	public smallBanner: string = 'assets/img/buyer/Banner_buyer_small.svg';
	public largeBanner: string = 'assets/img/buyer/Banner_buyer.svg';
	public bannerTitle: string = 'Нашим<br/> покупателям';
	public innerWidth: number;
	public isDesktop: boolean;
	public modalCardTitle: string;
	public modalCardText: string;
	public isVisibleModalCard: boolean = false;

	public cards = [
		{
			icon: 'assets/icons/buyer/free-delivery_icon.svg',
			title: 'Бесплатная и <br/>быстрая доставка',
			text: 'Заказывая цветы на нашем сайте, вы не платите за доставку. Цена на сайте окончательная.'
		},
		{
			icon: 'assets/icons/buyer/order-doubleclick_icon.svg',
			title: 'Заказ <br class="large"/>в 2 клика',
			text: 'Заказ можно оформить всего за пару минут. Просто выберите букет и адресата, а остальное мы сделаем сами.'
		},
		{
			icon: 'assets/icons/buyer/huge-selection_icon.svg',
			title: 'Огромный выбор',
			text: 'На нашем сайте десятки лучших флористов, предлагающих свои лучшие товары. У нас всегда широкий ассортимент для вас.'
		},
		{
			icon: 'assets/icons/buyer/fresh-flower_icon.svg',
			title: 'Всегда свежие <br/>цветы',
			text: 'Мы очень требовательны при выборе партнеров и гарантируем качество наших цветов.'
		}
	];

	public bestBouquet = [
		{
			icon: 'assets/icons/buyer/hand.svg',
			text: 'Выберите лучший букет в каталоге на нашем сайте'
		},
		{
			icon: 'assets/icons/buyer/basket.svg',
			text: 'Добавьте букет в корзину'
		},
		{
			icon: 'assets/icons/buyer/user.svg',
			text: 'Укажите кому и когда доставить'
		},
		{
			icon: 'assets/icons/buyer/car.svg',
			text: 'Вежливые и пунктуальные курьеры привезут вам цветы точно ко времени'
		}
	];

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

	openCatalog() {
		this.router.navigate(['catalog']);
	}

	showCardDetails(index: number) {
		this.modalCardTitle = this.cards[index].title;
		this.modalCardText = this.cards[index].text;
		this.isVisibleModalCard = true;
	}

	hideCardModal() {
		this.isVisibleModalCard = false;
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
