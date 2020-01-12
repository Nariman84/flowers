import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'send-message',
	templateUrl: './send-message.component.html',
	styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

	constructor() { }

	public helpList = [
		'Если вы хотите уточнить какой-то вопрос, связанный с работой сайта, напишите нам на электронную почту info@jbandflowers.ru, либо в мессенджеры. Мы всегда рады помочь вам и постараемся ответить максимально оперативно.',
		'Если вам привезли букет, который не соответствует вашим ожиданиям, напишите нам на электронную почту info@jbandflowers.ru с указанием темы “Претензия к заказу”, либо в мессенджеры.',
		'Если имеют место очевидные нарушения, например, букет оказался несвежим либо не соответствовал по ассортименту вашему заказу, мы вернем вам деньги за заказ, после чего самостоятельно будем разбираться с причинами допущенных нарушений.'
	];

	ngOnInit() { }

}
