import { Component, Output, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
	selector: 'filter-price',
	templateUrl: './filter-price.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-price.component.css'
	]
})
export class FilterPriceComponent {

	constructor() { }

	@Output() onChangedPrice = new EventEmitter();

	isActive: boolean;
	minValue:number = 1200;
	maxValue:number = 17800;
	options: Options = {
		floor: 1200,
		ceil: 17800,
		step: 100,
		animate: false,
		hideLimitLabels: true,
		hidePointerLabels: true
	};

	dropdown() {
		this.isActive = !this.isActive;
	}

	onChangedRange(e:Event) {
		this.onChangedPrice.emit({minValue: this.minValue, maxValue: this.maxValue});
	}

	onChanged(e:Event) {
		this.onChangedPrice.emit({minValue: this.minValue, maxValue: this.maxValue});
	}
}