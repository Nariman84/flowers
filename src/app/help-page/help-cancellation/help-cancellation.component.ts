import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'help-cancellation',
	templateUrl: './help-cancellation.component.html',
	styleUrls: ['./help-cancellation.component.css']
})
export class HelpCancellationComponent implements OnInit {

	constructor() { }

	public helpList = [
		'Если по какой-то причине вы решили отказаться от заказа, пожалуйста, как можно скорее напишите нам на электронную почту <a href="mailto:info@jbandflowers.ru">info@jbandflowers.ru</a> с указанием темы “Отмена заказа”. А так же вы можете написать в любой из доступных мессенджеров, указанных в верхней части экрана.',
		'Мы сразу же связываемся с флористом, который собирает для вас букет, и узнаем, успел ли он собрать букет и приступить к доставке.',
		'Если с момента оформления заказа прошло немного времени, мы вернем вам деньги за заказ в полном объеме.',
		'Если с момента оформления заказа прошло три часа, мы вернем вам деньги за заказ за вычетом расходов, понесенных флористом (кроме срочной доставки).',
		'В случае отмены заказа, предусматривающего срочную доставку (три часа и менее), мы вернем вам деньги за заказ за вычетом расходов, понесенных флористом.'
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
