import {Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

	@Input() lowPrice:number;
	@Input() attrIds:string;
	@Input() scrollDocumentToCatalog: Observable<void>;

	@ViewChild("catalog", {static: false})
	catalogRef: ElementRef;

	isOpenSidebarFilters: boolean;
	isCheckedFilter: boolean;
	attributesIds: string;
	maxValue: number;
	minValue: number;

	scrollToCatalog:any;

	constructor() { }

	//закрыть сайдбар с фильтрами
	closeSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}

	//открыть сайдбар с фильтрами
	openSidebarFilters():void {
		this.isOpenSidebarFilters = !this.isOpenSidebarFilters;
	}

	onCheckedChange(filterObj) {
		this.isCheckedFilter = filterObj.isChecked;
		this.attributesIds = filterObj.id;
	}

	onChangedRangePrice(rangeObj) {
		this.minValue = rangeObj.minValue;
		this.maxValue = rangeObj.maxValue;
	}

	ngOnInit() {
		this.scrollToCatalog = this.scrollDocumentToCatalog.subscribe(() => {
			this.catalogRef.nativeElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}

	ngOnDestroy() {
		this.scrollToCatalog.unsubscribe();
	}
}