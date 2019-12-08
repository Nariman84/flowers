import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'sidebar-filters',
	templateUrl: './sidebar-filters.component.mobile.html',
	styleUrls: ['./sidebar-filters.component.mobile.css']
})
export class SidebarFiltersComponentMobile {

	@Input() isOpenSidebarFilters: boolean;
	@Output() onCloseSidebarFilters = new EventEmitter();
	@Output() onCheckedChange = new EventEmitter();
	@Output() onChangedRangePrice = new EventEmitter();

	constructor() {	}

	closeSidebarFilters() {
		this.onCloseSidebarFilters.emit();
	}

	onCheckedChangeFilter(filterObj) {
		this.onCheckedChange.emit(filterObj);
	}

	onChangedPrice(rangeObj) {
		this.onChangedRangePrice.emit(rangeObj);
	}
}