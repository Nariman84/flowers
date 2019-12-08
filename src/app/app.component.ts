import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor() {}

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
}