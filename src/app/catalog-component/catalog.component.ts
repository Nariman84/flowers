import {Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
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
	public scrollToCatalog: any;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	getScreenState(innerWidth: number):void {
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