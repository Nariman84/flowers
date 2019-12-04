import { Component } from '@angular/core';

@Component({
	selector: 'filter-price',
	templateUrl: './filter-price.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-price.component.css'
	]
})
export class FilterPriceComponent {

	constructor() { }
	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}