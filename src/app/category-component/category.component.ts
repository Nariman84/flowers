import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent {

	constructor() { }

	lowPrice:number = 2000;

	@Output() getCheapProd = new EventEmitter();
	@Output() getCategoryFlowers = new EventEmitter();

	loadCheapProd(e:Event) {
		this.getCheapProd.emit(this.lowPrice);
	}

	loadCategoryProd(e:Event) {
		let attributesIds:string = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		this.getCategoryFlowers.emit(attributesIds);
	}
}