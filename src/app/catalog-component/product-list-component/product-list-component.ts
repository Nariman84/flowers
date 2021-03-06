import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { ApiService } from '../../services/api.service';
import { StateFilterService } from 'src/app/services/state-filter.service';
import { ChangeFilterService } from 'src/app/services/change-filters.service';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: '[product-list]',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductListComponent implements OnInit {

	@Input() setGridProduct: Observable<boolean>;
	@Input() setGridByOneProduct: Observable<boolean>;

	@Output() addToBasket = new EventEmitter();

	public eventSetGrid: Subject<boolean> = new Subject<boolean>();
	public flowers: Flower[] = [];
	private amountFlowers: number;
	public lowPrice: number;
	public attrIds: string;
	public isGrid: boolean = false;
	public isHiddenButton: boolean = false;
	public innerWidth: number;
	public isDesktop: boolean;

	public emptyProductListImage: string;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event): void {
		this.innerWidth = window.innerWidth;
	}

	getScreenState(innerWidth:number): void {
		if (innerWidth < 768) {
			this.isDesktop = false;
			this.emptyProductListImage = 'assets/img/catalog/empty_product_list_mobile!.svg';
		} else {
			this.isDesktop = true;
			this.emptyProductListImage = 'assets/img/catalog/empty_product_list!.svg';
		}
	}

	constructor(
		private apiService: ApiService,
		private stateFilterService: StateFilterService,
		private changeFilterService: ChangeFilterService,
	) {}

	getCheapProd(): void {
		this.apiService.getCheapFlowers(this.lowPrice)
			.subscribe(res => {
				this.flowers = res;
				this.hideButton(res.length);
			});
	}

	getCategoryProd(): void {
		this.flowers = [];
		this.apiService.getCategoryFlowers(this.attrIds)
			.subscribe(res => {
				this.flowers = this.flowers.concat(res);
				this.hideButton(res.length);
			});
	}

	loadMoreFlowers(): void {
		this.apiService.getMoreFlowers(this.amountFlowers)
			.subscribe(res => {
				this.flowers = this.flowers.concat(res);
				this.amountFlowers = this.flowers.length;
				this.hideButton(res.length);

			});
	}

	hideButton(resLength: number) {
		if (resLength < 9) {
			this.isHiddenButton = true;
		} else {
			this.isHiddenButton = false;
		}
	}

	setGrid(isGrid: boolean) {
		this.eventSetGrid.next(isGrid);
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.apiService.getFlowers()
			.subscribe(res => {
				this.flowers = res;
				this.amountFlowers = this.flowers.length;
			});

		this.stateFilterService._getCheapList.subscribe(lowPrice => {
			this.lowPrice = lowPrice;
			this.getCheapProd();
		});

		this.stateFilterService._getCategoryProd.subscribe(attrIds => {
			this.attrIds = attrIds;
			this.getCategoryProd();
		});

		this.changeFilterService._changeFilter.subscribe(filterObj => {
			let isCheckedFilter = filterObj.isChecked,
				id = filterObj.id;

			if (this.innerWidth <= 768) {
				this.apiService.getAllUrlParamsByFilter(isCheckedFilter, id);
			} else {
				this.flowers = [];
				this.apiService.getFlowersByFilter(isCheckedFilter, id)
					.subscribe(res => {
						this.flowers = res;
						this.amountFlowers = this.flowers.length;
						this.hideButton(res.length);
					});
			}
		});

		this.changeFilterService._changePriceFilter.subscribe(filterObj => {
			let minValue = filterObj.minValue,
				maxValue = filterObj.maxValue;
			if (this.innerWidth <= 768) {
				this.apiService.getAllUrlParamsByFilterPrice(minValue, maxValue);
			} else {
				this.flowers = [];
				this.apiService.getFlowersByFilterPrice(minValue, maxValue)
					.subscribe(res => {
						this.flowers = res;
						this.amountFlowers = this.flowers.length;
						this.hideButton(res.length);
					});
			}
		});

		this.changeFilterService._searchFlowers.subscribe(() => {
			this.flowers = [];
			this.apiService.searchFlowersByFilter()
				.subscribe(res => {
					this.flowers = res;
					this.hideButton(res.length);
				})
		});

		this.setGridProduct.subscribe(isGrid => {
			this.isGrid = isGrid;
			this.setGrid(this.isGrid);
		});

		this.setGridByOneProduct.subscribe(isGrid => {
			this.isGrid = isGrid;
			this.setGrid(this.isGrid);
		});
	}
}