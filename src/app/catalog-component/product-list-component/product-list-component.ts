import {Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
	selector: '[product-list]',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductListComponent implements OnInit, OnChanges {

	dataFromAPI: any = [];
	flowers: any = [];
	addFlowers: any = [];

	@Input() isCheckedFilter: boolean;
	@Input() attributesIds: string;
	@Input() minValue: number;
	@Input() maxValue: number;
	@Input() lowPrice: number;
	@Input() attrIds: string;


	constructor(private apiService: ApiService) {}

	getCheapProd() {
		this.apiService.getCheapFlowers(this.lowPrice)
			.subscribe(res => {
				this.flowers = res;
			});
	}

	getCategoryProd() {
		this.apiService.getCategoryFlowers(this.attrIds)
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = this.flowers.concat(this.addFlowers);
			});
	}

	loadMoreFlowers() {
		this.apiService.getMoreFlowers()
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = this.flowers.concat(this.addFlowers);
			});
	}

	getProductListByFilter(isCheckedFilter:boolean, ids:string, minValue:number, maxValue:number) {
		this.flowers = [];
		this.apiService.getFlowersByFilter(isCheckedFilter, ids, minValue, maxValue)
			.subscribe(res => {
				this.addFlowers = res;
				this.flowers = res;
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.isCheckedFilter || changes.attributesIds) {
			this.getProductListByFilter(this.isCheckedFilter, this.attributesIds, this.minValue, this.maxValue);
		}

		if (changes.minValue || changes.maxValue) {
			this.getProductListByFilter(this.isCheckedFilter, this.attributesIds, this.minValue, this.maxValue);
		}

		if (changes.lowPrice && changes.lowPrice.previousValue != changes.lowPrice.currentValue) {
			this.getCheapProd();
		}

		if (changes.attrIds && changes.attrIds.previousValue != changes.attrIds.currentValue) {
			this.getCategoryProd();
		}
	}

	ngOnInit() {
		this.apiService.authorize()
		.subscribe(data => {

			this.apiService.getFlowers()
				.subscribe(res => {
					this.flowers = res;
				});
		});
	}
}