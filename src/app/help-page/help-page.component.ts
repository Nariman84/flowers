import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-help-page',
	templateUrl: './help-page.component.html',
	styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/help/Banner_help_small.svg';
	public largeBanner: string = 'assets/img/help/Banner_help.svg';
	public bannerTitle: string = 'Часто задаваемые<br/> вопросы';

	public questions = [
		{
			link: 'make-an-order',
			icon: 'assets/icons/help/make-an-order.svg',
			title: 'Как сделать заказ'
		},
		{
			link: 'order-cancellation',
			icon: 'assets/icons/help/order-cancellation.svg',
			title: 'Как оплатить заказ'
		},
		{
			link: 'order-payment',
			icon: 'assets/icons/help/order-payment.svg',
			title: 'Как отменить заказ'
		},
		{
			link: 'send-message',
			icon: 'assets/icons/help/send-message.svg',
			title: 'Написать нам'
		}
	];

	ngOnInit() {  }

}
