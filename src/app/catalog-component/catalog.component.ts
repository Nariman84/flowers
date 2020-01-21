import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	public smallBanner: string = 'assets/img/Banner_small.svg';
	public largeBanner: string = 'assets/img/banner_.svg';
	public bannerTitle: string = 'Каталог';

	public innerWidth: number;
	public isMainPage: boolean;
	public isResizeScreen: boolean = false;
	public isDesktop: boolean;
	public isSmoothTransitionFilter: boolean;
	public isOpenSidebarFilters: boolean = false;
	public isVisibleBackdrop: boolean = false;
	public isGrid: boolean = false;
	public isVisibleBanner: boolean = false;

	public eventSetGrid: Subject<boolean> = new Subject<boolean>();
	public eventSetOneByOne: Subject<boolean> = new Subject<boolean>();
	public eventOpenSidebarFilter: Subject<boolean> = new Subject<boolean>();

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isDesktop = false;

			setTimeout(() => {
				this.isSmoothTransitionFilter = true;
			}, 500);
		} else {
			this.isDesktop = true;
			this.isSmoothTransitionFilter = false;
			this.isOpenSidebarFilters = false;
			this.isVisibleBackdrop = false;
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
		this.getScreenState(this.innerWidth);

		if (this.route.routeConfig.path === "catalog") {
			this.isVisibleBanner = true;
		} else {
			this.isMainPage = true;
		}
	}
}