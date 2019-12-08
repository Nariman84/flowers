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
	filterTypes:any[] = [
		{ attributesId: "201", boxType: "Монобукеты", name: "mono"},
		{ attributesId: "202", boxType: "Авторские букеты", name: "author" },
		{ attributesId: "203", boxType: "Букеты в коробках", name: "box" },
		{ attributesId: "204", boxType: "Букетоны", name: "bouqueton" },
		{ attributesId: "206", boxType: "Свадебные", name: "marriage" },
		{ attributesId: "205", boxType: "Сладкие букеты", name: "sweet" },
		{ attributesId: "207", boxType: "Декор", name: "decor" }
	];

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