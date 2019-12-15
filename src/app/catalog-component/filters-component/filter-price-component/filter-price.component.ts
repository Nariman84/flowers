import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';

@Component({
	selector: 'filter-price',
	templateUrl: './filter-price.component.html',
	styleUrls: [
		'../filters.component.css',
		'./filter-price.component.css'
	]
})
export class FilterPriceComponent implements OnInit {

	constructor(
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService
	) { }

	@Output() onChangedPrice = new EventEmitter();
	@ViewChild('min', {static: false})
	minInput: ElementRef;

	@ViewChild('max', {static: false})
	maxInput: ElementRef;

	public isActive: boolean;
	public minValue:number = 1200;
	public maxValue:number = 17800;
	public minValueRange:number = 1200;
	public maxValueRange:number = 17800;
	public options: Options = {
		floor: 1200,
		ceil: 17800,
		step: 100,
		animate: false,
		hideLimitLabels: true,
		hidePointerLabels: true
	};

	dropdown():void {
		this.isActive = !this.isActive;
	}

	getFlowersInTheRange(e:Event):void {
		this.changeFilterService.onChangePriceFilter(this.minValueRange, this.maxValueRange);
	}

	onChangedRange(e:Event):void {
		this.minValue = this.minValueRange;
		this.maxValue = this.maxValueRange;
	}

	onChanged(e:Event):void {
		this.changeFilterService.onChangePriceFilter(this.minValue, this.maxValue);
		this.minValueRange = this.minValue;
		this.maxValueRange = this.maxValue;
	}

	ngOnInit() {
		this.stateFilterService._chooseFilters.subscribe(isClickedCategory => {
			if (isClickedCategory) {
				this.minValue = this.minValueRange = 1200;
				this.maxValue = this.maxValueRange = 17800;
			}
		});

		this.stateFilterService._setMaxValue.subscribe(maxValue => {
			this.maxValue = maxValue;
			this.maxValueRange = maxValue;
		});


	}
}