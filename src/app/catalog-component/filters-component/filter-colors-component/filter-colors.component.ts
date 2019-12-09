import {Component, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
	selector: 'filter-colors',
	templateUrl: './filter-colors.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-colors.component.css'
	]
})
export class FilterColorsComponent {

	constructor() { }

	isActive: boolean;
	isActiveColor: boolean;
	attrIds: string[] = ['301', '302', '304', '305',
						'303', '308', '309', '306',
						'311', '312', '307', '310'];

	@Output() onChangeColor = new EventEmitter();

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChanged(e:Event) {
		let attributesIds = (e.target as HTMLInputElement).getAttribute('data-attributes-ids');
		let isChecked:boolean = (e.target as HTMLInputElement).checked;
		this.onChangeColor.emit({isChecked: isChecked, id: attributesIds});

		let labelColor = (e.target as HTMLInputElement).nextSibling;

		(labelColor as HTMLInputElement).classList.toggle('color-active');
	}
}