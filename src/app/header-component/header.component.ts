import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	isOpenMainSidebar: boolean;

	constructor() {	}

	public innerWidth: any;
	public isDesktop: boolean;

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

	//закрыть сайдбар с навигацией
	closeMainSidebar() {
		this.isOpenMainSidebar = !this.isOpenMainSidebar;
	}

	//открыть сайдбар с навигацией
	openNav():void {
		this.isOpenMainSidebar = !this.isOpenMainSidebar;
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}