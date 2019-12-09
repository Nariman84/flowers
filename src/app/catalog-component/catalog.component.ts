import {Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
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

	public innerWidth: any;
	isDesktop: boolean;
	isOpenSidebarFilters: boolean;
	isCheckedFilter: boolean;
	attributesIds: string;
	maxValue: number;
	minValue: number;

	scrollToCatalog:any;

	constructor() { }

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	getScreenState(innerWidth) {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

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
		this.innerWidth = window.innerWidth;
		this.scrollToCatalog = this.scrollDocumentToCatalog.subscribe(() => {
			this.catalogRef.nativeElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
		this.getScreenState(this.innerWidth);
	}

	ngOnDestroy() {
		this.scrollToCatalog.unsubscribe();
	}
}