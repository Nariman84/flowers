import {Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[filters]',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

	constructor() { }

	@Output() onCheckedChangeFilter = new EventEmitter();
	@Output() onChangedPrice = new EventEmitter();

	onCheckedChange(filterObj) {
		this.onCheckedChangeFilter.emit(filterObj);
	}

	onChangedRangePrice(rangeObj) {
		this.onChangedPrice.emit(rangeObj);
	}
}