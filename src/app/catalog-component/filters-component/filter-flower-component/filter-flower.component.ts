import {Component } from '@angular/core';

@Component({
	selector: 'filter-flower',
	templateUrl: './filter-flower.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-flower.component.css'
	]
})
export class FilterFlowerComponent {

	constructor() { }
	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}