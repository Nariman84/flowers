import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'lifehack-page',
	templateUrl: './lifehack-page.component.html',
	styleUrls: ['./lifehack-page.component.css']
})
export class LifehackPageComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/lifehack/Banner_lifehack_small.svg';
	public largeBanner: string = 'assets/img/lifehack/Banner_lifehack.svg';
	public bannerTitle: string = 'Как ухаживать<br/> за цветами';

	public lifehacks = [
		{
			title: 'Лайфхак 1',
			text: 'Очистить контактирующую с водой нижную часть стеблей от листьев и шипов,  иначе вода будет цвести и пахнуть',
			time: '~ 1 минута'
		},
		{
			title: 'Лайфхак 2',
			text: 'Обновить срезы стеблей, погрузив их под струю воды. Резать стебли необходимо по косой линии (45°)',
			time: '~ 3 минута'
		},
		{
			title: 'Лайфхак 3',
			text: 'Цветы, как известно любят прохладу, не допускайте прямых солнечных лучей и преобладания тепла',
			time: '~ 1 минута'
		},
		{
			title: 'Лайфхак 4',
			text: 'Меняйте воду в вазе ежедневно. Соблюдая это правило цветы будут радовать вас гораздно дольше',
			time: '~ 2 минута'
		},
		{
			title: 'Лайфхак 5',
			text: 'Добавьте в воду сахар или аспирин. Также можно можно добавить специальные добавки - “Кризал”, ”Бутон”.',
			time: '~ 1 минута'
		}
	];

	ngOnInit() { }

}
