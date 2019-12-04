import {Component } from '@angular/core';

@Component({
	selector: 'filter-occasion',
	templateUrl: './filter-occasion.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-occasion.component.css'
	]
})
export class FilterOccasionComponent {

	constructor() { }
	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}