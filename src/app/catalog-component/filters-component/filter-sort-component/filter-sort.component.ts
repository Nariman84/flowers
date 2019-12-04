import { Component } from '@angular/core';

@Component({
	selector: 'filter-sort',
	templateUrl: './filter-sort.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-sort.component.css'
	]
})
export class FilterSortComponent {

	constructor() { }
	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}