import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor() {}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	public innerWidth: any;
	public isDesktop: boolean;
	public eventScrollToCatalog: Subject<void> = new Subject<void>();

	public lowPrice: number;
	public attributesIds: string;

	getCheapFlowers(price) {
		this.lowPrice = price;
	}

	getCategoryFlowers(id) {
		this.attributesIds = id;
	}

	scrollToCatalog() {
		this.eventScrollToCatalog.next()
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}