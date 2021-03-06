import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'help-payment',
	templateUrl: './help-payment.component.html',
	styleUrls: ['./help-payment.component.css']
})
export class HelpPaymentComponent implements OnInit {

	constructor() { }

	public helpList = [
		'Сайт предусматривает безналичную форму оплаты.',
		'Оплатить товар вы можете с помощью платежного сервиса Яндекс.Касса – это удобно и безопасно, вы можете не переживать о том, пройдет ли оплата.',
		'Для оплаты нужно просто ввести данные своей банковской карты. Все платежи защищены.',
		'После списания денежных средств вам на электронную почту (если вы ее указывали) или в смс приходит квитанция об оплате в соответствии с Федеральным Законом № 54.'
	];

	private innerWidth: number;
	public isMobile: boolean;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 576) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
