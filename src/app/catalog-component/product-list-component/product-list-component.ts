import {Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';

@Component({
	selector: '[product-list]',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductListComponent implements OnInit {

	flowers: any = [];
	addFlowers: any = [];

	amountflowers: number;
	lowPrice:number;
	attrIds: string;

	constructor(
		private apiService: ApiService,
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService
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

		this.changeFilterService._changeFilter.subscribe(filterObj => {
			this.flowers = [];
			let isCheckedFilter = filterObj.isChecked,
				id = filterObj.id;
			this.apiService.getFlowersByFilter(isCheckedFilter, id)
				.subscribe(res => {
					this.flowers = res;
					this.amountflowers = this.flowers.length;
				});
		});

		this.changeFilterService._changePriceFilter.subscribe(filterObj => {
			this.flowers = [];
			let minValue = filterObj.minValue,
				maxValue = filterObj.maxValue;
			this.apiService.getFlowersByFilterPrice(minValue, maxValue)
				.subscribe(res => {
					this.addFlowers = res;
					this.flowers = res;
					this.amountflowers = this.flowers.length;
				});
		});
	}
}