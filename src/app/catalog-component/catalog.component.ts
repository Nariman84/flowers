import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

	constructor() { }

	@Input() scrollDocumentToCatalog: Observable<void>;

	@ViewChild("catalog", {static: false})
	catalogRef: ElementRef;

	public innerWidth: number;
	public isDesktop: boolean;
	public isOpenSidebarFilters: boolean;
	public isVisibleBackdrop: boolean = false;
	public scrollToCatalog: any;
	public isGrid: boolean = false;

	public eventSetGrid: Subject<boolean> = new Subject<boolean>();
	public eventSetOneByOne: Subject<boolean> = new Subject<boolean>();
	public eventOpenSidebarFilter: Subject<boolean> = new Subject<boolean>();

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
			this.isOpenSidebarFilters = false;
		} else {
			this.isVisibleBackdrop = false;
			this.isDesktop = true;
			this.isGrid = false;
			this.eventSetGrid.next(this.isGrid);
			this.eventSetOneByOne.next(this.isGrid);
		}
	}

	setColorIconGrid():string {
		return this.isGrid ? 'assets/icons/grid_red.png' : 'assets/icons/grid_grey.png';
	}

	setColorIconNotGrid():string {
		return this.isGrid ? 'assets/icons/sqare_grey.png' : 'assets/icons/sqare_red.png';
	}

	//закрыть сайдбар с фильтрами
	closeSidebarFilters(isOpenSidebarFilters: boolean):void {
		this.isVisibleBackdrop = false;
		this.isOpenSidebarFilters = isOpenSidebarFilters;
	}

	//открыть сайдбар с фильтрами
	openSidebarFilters():void {
		this.isVisibleBackdrop = true;
		this.isOpenSidebarFilters = true;
		this.eventOpenSidebarFilter.next(this.isOpenSidebarFilters);
	}

	onGrid():void {
		this.isGrid = true;
		this.eventSetGrid.next(this.isGrid);
	}

	onOneByOne():void {
		this.isGrid = false;
		this.eventSetOneByOne.next(this.isGrid);
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