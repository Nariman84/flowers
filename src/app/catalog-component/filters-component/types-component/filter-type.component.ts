import { Component } from '@angular/core';

@Component({
	selector: 'filter-type',
	templateUrl: './filter-type.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-type.component.css'
	]
})
export class FilterTypesComponent {

	constructor() { }
	isActive: boolean;

	dropdown() {
		this.isActive = !this.isActive;
	}
}