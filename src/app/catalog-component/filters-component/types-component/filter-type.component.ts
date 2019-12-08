import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'filter-type',
	templateUrl: './filter-type.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-type.component.css'
	]
})
export class FilterTypesComponent {

	constructor() { }

	isActive: boolean;

	@Output() onCheckedChange = new EventEmitter();

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event) {
		let attributesIds:string = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.onCheckedChange.emit({isChecked: isChecked, id: attributesIds});
	}
}