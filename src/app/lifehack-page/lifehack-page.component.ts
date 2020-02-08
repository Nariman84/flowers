import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'lifehack-page',
	templateUrl: './lifehack-page.component.html',
	styleUrls: ['./lifehack-page.component.css']
})
export class LifehackPageComponent implements OnInit {

	constructor() { }

	public innerWidth: number;
	public isDesktop: boolean;

	public lifehacks = [
		{
			title: 'Лайфхак 1',
			text: 'Очистить контактирующую с водой нижнюю часть стеблей от листьев и шипов,  иначе вода будет цвести и пахнуть',
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

	getBackgroundLeaf(index: number) {
		if (index === 0 || index % 2 === 0) {
			let pathLeafSvg = '/assets/icons/lifehack/leaf-180.svg';
			return `url(${pathLeafSvg}) right no-repeat`;
		}
	}

	getBackgroundRotateLeaf(index: number) {
		let pathLeafSvg = '/assets/icons/lifehack/leaf.svg';
		if (index % 2 !== 0) {
			return `url(${pathLeafSvg}) left no-repeat`;
		} else if (!this.isDesktop) {
			return `url(${pathLeafSvg}) no-repeat`;
		}
	}

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

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
