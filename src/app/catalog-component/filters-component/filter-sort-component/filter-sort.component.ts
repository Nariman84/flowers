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

	public filterSort: any[] = [
		{ title: "Популярные", id: "popular" },
		{ title: "Недавние", id: "recent" },
		{ title: "Недорогие", id: "cheap" }
	]

	dropdown() {
		this.isActive = !this.isActive;
	}
}