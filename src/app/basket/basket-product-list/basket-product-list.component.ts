import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'basket-product-list',
	templateUrl: './basket-product-list.component.html',
	styleUrls: ['./basket-product-list.component.css']
})
export class BasketProductListComponent implements OnInit {

	constructor() { }

	@Input() basketProducts;

	ngOnInit() {
	}

}
