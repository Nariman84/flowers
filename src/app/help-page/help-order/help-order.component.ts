import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'help-order',
	templateUrl: './help-order.component.html',
	styleUrls: ['./help-order.component.css']
})
export class HelpOrderComponent implements OnInit {

	constructor() { }

	public helpList = [
		'Для того, чтобы сделать заказ на сайте, вам необходимо выбрать понравившийся товар в каталоге и нажать кнопку “В корзину”.',
		'Для оформления заказа необходимо перейти в корзину (иконка в правой верхней части экрана), заполнить необходимые поля, указать кому и когда необходимо доставить выбранный товар.',
		'После того, как все обязательные поля будут заполнены, вам будет предложено оплатить товар.',
		'После оплаты товара заказ принимается в работу - ваш флорист начинает собирать для вас букет и планирует время доставки вам вашего букета.'
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
