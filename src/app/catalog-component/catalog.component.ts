import {Component, Input } from '@angular/core';

@Component({
	selector: 'catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

	@Input() lowPrice:number;
	@Input() attrIds:string;

	isOpenSidebarFilters: boolean;
	isCheckedFilter: boolean;
	attributesIds: string;
	maxValue: number;
	minValue: number;

	constructor() { }

	//закрыть сайдбар с фильтрами
	closeSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}

	//открыть сайдбар с фильтрами
	openSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}

	onCheckedChange(filterObj) {
		this.isCheckedFilter = filterObj.isChecked;
		this.attributesIds = filterObj.id;
	}

	onChangedRangePrice(rangeObj) {
		this.minValue = rangeObj.minValue;
		this.maxValue = rangeObj.maxValue;
	}
}