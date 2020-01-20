import { Component, OnInit } from '@angular/core';
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

	openQuestion(link: string) {
		this.router.navigate(['help', link]);

		console.log(this.activatedRoute.data)
		console.log(this.activatedRoute.data)
	}

	openCatalog() {
		this.router.navigate(['catalog']);
	}

	ngOnInit() {  }

}
