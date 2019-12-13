import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { StateFilterService } from 'src/app/services/state-filter.service';

@Component({
	selector: 'filter-price',
	templateUrl: './filter-price.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-price.component.css'
	]
})
export class FilterPriceComponent implements OnInit {

	constructor(private stateFilterService: StateFilterService) { }

	@Output() onChangedPrice = new EventEmitter();
	@ViewChild('min', {static: false})
	minInput: ElementRef;

	@ViewChild('max', {static: false})
	maxInput: ElementRef;

	colorTrack = {};
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

	ngOnInit() {
		this.stateFilterService._chooseFilters.subscribe(isClickedCategory => {
			if (isClickedCategory) {
				this.minValue = 1200;
				this.maxValue = 17800;
			}
		});

		this.stateFilterService._setMaxValue.subscribe(maxValue => this.maxValue = maxValue)
	}
}