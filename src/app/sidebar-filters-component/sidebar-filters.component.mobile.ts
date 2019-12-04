import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'sidebar-filters',
	templateUrl: './sidebar-filters.component.mobile.html',
	styleUrls: ['./sidebar-filters.component.mobile.css']
})
export class SidebarFiltersComponentMobile {

	@Input() isOpenSidebarFilters: boolean;
	@Output() onCloseSidebarFilters = new EventEmitter();

	constructor() {	}

	closeSidebarFilters() {
		this.onCloseSidebarFilters.emit();
	}
}