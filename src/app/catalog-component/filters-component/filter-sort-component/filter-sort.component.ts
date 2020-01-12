import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';

@Component({
	selector: 'filter-sort',
	templateUrl: './filter-sort.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-sort.component.css'
	]
})
export class FilterSortComponent implements AfterViewInit {

	constructor() { }

	@ViewChildren('inputSort') inputSort: QueryList<ElementRef>;

	public isActive: boolean;
	public isChecked: boolean;
	private arrInputSort: HTMLInputElement[] = [];

	public filterSort: Array<{title: string, id: string}> = [
		{ title: "Популярные", id: "popular" },
		{ title: "Недавние", id: "recent" },
		{ title: "Недорогие", id: "cheap" }
	]

	dropdown(): void {
		this.isActive = !this.isActive;
	}

	disableCheck(e:Event): void {
		let target = e.target as HTMLInputElement;

		for (let i = 0; i < this.arrInputSort.length; i++) {
			if (target != this.arrInputSort[i]) {
				this.arrInputSort[i].checked = false;
			}
		}
	}

	ngAfterViewInit() {
		this.inputSort.forEach(input => this.arrInputSort.push(input.nativeElement));
	}
}