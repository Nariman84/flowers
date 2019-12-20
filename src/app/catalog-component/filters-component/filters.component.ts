import { Component, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangeFilterService } from 'src/app/services/change-filters.service';
import { Observable } from 'rxjs';

@Component({
	selector: '[filters]',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

	constructor(private changeFilterService: ChangeFilterService) { }

	public innerWidth: number;
	public isMobile: boolean;
	public isOpenSidebarFilters: boolean;

	@Input() openSidebarFilter: Observable<boolean>;
	@Output() hideSidebarFilters = new EventEmitter();

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 768) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	//закрыть сайдбар с фильтрами
	closeSidebarFilters():void {
		this.isOpenSidebarFilters = false;
		this.hideSidebarFilters.emit(this.isOpenSidebarFilters);
	}

	searchFlowers() {
		this.changeFilterService.onClickSearchButton();
		this.closeSidebarFilters();
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.openSidebarFilter.subscribe(isOpenSidebarFilters => {
			this.isOpenSidebarFilters = isOpenSidebarFilters;
		})
	}
}