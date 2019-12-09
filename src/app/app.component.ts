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
		if (this.innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	public innerWidth: any;
	public isDesktop: boolean;
	private eventScrollToCatalog: Subject<void> = new Subject<void>();

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

	ngOnInit() {
		this.innerWidth = window.innerWidth;
	}
}