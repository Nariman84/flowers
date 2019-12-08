import {Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-flower',
	templateUrl: './filter-flower.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-flower.component.css'
	]
})
export class FilterFlowerComponent {

	constructor() { }

	isActive: boolean;
	filterFlower: any[] = [
		{ attributesId: "401", flowerName: "Альстромерии" },
		{ attributesId: "402", flowerName: "Амориллисы" },
		{ attributesId: "403", flowerName: "Анемоны" },
		{ attributesId: "404", flowerName: "Васильки" },
		{ attributesId: "405", flowerName: "Гвоздики" },
		{ attributesId: "406", flowerName: "Георгины" },
		{ attributesId: "407", flowerName: "Герберы" }
	];

	@Output() onCheckedChange = new EventEmitter();

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event) {
		let attributesIds = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.onCheckedChange.emit({isChecked: isChecked, id: attributesIds});
	}
}