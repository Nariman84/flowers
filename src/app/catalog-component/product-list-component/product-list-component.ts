import {Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { Observable } from 'rxjs';

@Component({
	selector: '[product-list]',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductListComponent implements OnInit {

	dataFromAPI: any = [];
	flowers: any = [];
	addFlowers: any = [];
	checkedChange: any;
	changedRangePrice: any;

	isCheckedFilter: boolean;
	attributesIds: string;
	minValue: number;
	maxValue: number;
	amountflowers: number;
	lowPrice:number;
	attrIds: string;

	@Input() onCheckedChange: Observable<any>;
	@Input() onChangedRangePrice: Observable<any>;


	constructor(
		private apiService: ApiService,
		private stateFilterService: StateFilterService
	) {}

	getCheapProd() {
		this.apiService.getCheapFlowers(this.lowPrice)
			.subscribe(res => {
				this.flowers = res;
			});
	}

	getCategoryProd() {
		this.flowers = [];
		this.apiService.getCategoryFlowers(this.attrIds)
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = this.flowers.concat(this.addFlowers);
			});
	}

	loadMoreFlowers() {
		this.apiService.getMoreFlowers(this.amountflowers)
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = this.flowers.concat(this.addFlowers);
				this.amountflowers = this.flowers.length;
			});
	}

	getProductListByFilter(isCheckedFilter:boolean, ids:string) {
		this.flowers = [];
		this.apiService.getFlowersByFilter(isCheckedFilter, ids)
			.subscribe(res => {
				this.flowers = res;
				this.amountflowers = this.flowers.length;
			});
	}

	getProductListByFilterPrice(minValue:number, maxValue:number) {
		this.flowers = [];
		this.apiService.getFlowersByFilterPrice(minValue, maxValue)
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = res;
				this.amountflowers = this.flowers.length;
			});
	}

	ngOnInit() {
		this.apiService.authorize()
		.subscribe(data => {

			this.apiService.getFlowers()
				.subscribe(res => {
					this.flowers = res;
					this.amountflowers = this.flowers.length;
				});
		});

		this.stateFilterService._getCheapList.subscribe(lowPrice => {
			this.lowPrice = lowPrice;
			this.getCheapProd();
		})

		this.stateFilterService._getCategoryProd.subscribe(attrIds => {
			this.attrIds = attrIds;
			this.getCategoryProd();
		})

		this.checkedChange = this.onCheckedChange.subscribe(filterObj => {
			this.isCheckedFilter = filterObj.isChecked;
			this.attributesIds = filterObj.id;
			this.getProductListByFilter(this.isCheckedFilter, this.attributesIds);
		});

		this.changedRangePrice = this.onChangedRangePrice.subscribe(rangeObj => {
			this.minValue = rangeObj.minValue;
			this.maxValue = rangeObj.maxValue;
			this.getProductListByFilterPrice(this.minValue, this.maxValue);
		});
	}
}