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

	public isActive: boolean;
	public isChecked: boolean;

	public filterSort: Array<{title: string, id: string}> = [
		{ title: "Популярные", id: "popular" },
		{ title: "Недавние", id: "recent" },
		{ title: "Недорогие", id: "cheap" }
	]

	dropdown(): void {
		this.isActive = !this.isActive;
	}
}