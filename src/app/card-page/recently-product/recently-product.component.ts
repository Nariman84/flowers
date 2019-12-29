import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'recently-product',
	templateUrl: './recently-product.component.html',
	styleUrls: ['./recently-product.component.css']
})
export class RecentlyProductComponent implements OnInit {

	constructor() { }

	recentlyProducts: number[] = [];

	ngOnInit() {}
}
