import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'partnership',
	templateUrl: './partnership.component.html',
	styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/partnership/Banner_partnership_small.svg';
	public largeBanner: string = 'assets/img/partnership/Banner_partnership.svg';

	public instructionWork = [
		{
			icon: 'assets/icons/partnership/step-1.svg',
			text: 'На главной странице нажать на иконку пользователя в правом верхнем углу',
			example: 'assets/img/partnership/example_step-1.png'
		},
		{
			icon: 'assets/icons/partnership/step-2.svg',
			text: 'В открывшемся окне необходимо нажать кнопку “Регистрация” и полностью пройти ее',
			example: 'assets/img/partnership/example_step-2.png'
		},
		{
			icon: 'assets/icons/partnership/step-3.svg',
			text: 'Напишите нам на электронную почту info@jbandflowers.ru свои Имя и Email, указанные при регистрации, тема письма “Регистрация магазина”.',
			example: 'assets/img/partnership/example_step-3.png'
		},
		{
			icon: 'assets/icons/partnership/step-4.svg',
			text: 'Проверка может занять 1-2 рабочих дня. Мы сообщим вам о том, что ваш аккаунт переведен в статус магазина. В таком случае в личном кабинете вы увидите кнопку ”Админ. Панель".',
			example: 'assets/img/partnership/example_step-4.png'
		},
		{
			icon: 'assets/icons/partnership/step-5.svg',
			text: 'Все готово! В Административной панели магазина вы можете создавать и редактировать карточки товаров, управлять заказами, а также видеть свои финансы и статистику.',
			example: 'assets/img/partnership/example_step-5.png'
		}
	];

	ngOnInit() { }
}