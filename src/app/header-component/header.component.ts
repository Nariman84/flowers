import { Component } from '@angular/core';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	isOpenMainSidebar: boolean;

	constructor() {	}

	//закрыть сайдбар с навигацией
	closeMainSidebar() {
		this.isOpenMainSidebar = !this.isOpenMainSidebar;
	}

	//открыть сайдбар с навигацией
	openNav():void {
		this.isOpenMainSidebar = !this.isOpenMainSidebar;
	}
}