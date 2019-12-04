import {Component } from '@angular/core';

@Component({
	selector: 'filter-colors',
	templateUrl: './filter-colors.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-colors.component.css'
	]
})
export class FilterColorsComponent {

	constructor() { }

	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}