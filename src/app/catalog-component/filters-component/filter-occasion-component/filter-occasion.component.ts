import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-occasion',
	templateUrl: './filter-occasion.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-occasion.component.css'
	]
})
export class FilterOccasionComponent {

	constructor() { }

	isActive: boolean;
	filterOccasion: any[] = [
		{ attributesId: "501", occasionName: "Повод1" },
		{ attributesId: "502", occasionName: "Повод2" }
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