import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor() {}

	public lowPrice: number;
	public attributesIds: string;

	getCheapFlowers(price) {
		this.lowPrice = price;
	}

	getCategoryFlowers(id) {
		this.attributesIds = id;
	}
}