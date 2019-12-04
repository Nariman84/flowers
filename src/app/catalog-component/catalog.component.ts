import {Component } from '@angular/core';

@Component({
	selector: 'catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

	isOpenSidebarFilters: boolean;

	constructor() { }

	//закрыть сайдбар с фильтрами
	closeSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}

	//открыть сайдбар с фильтрами
	openSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}
}