import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StateFilterService {

	constructor() {	}

	public isClickedCategory: boolean;
	public lowPrice: number;
	public attributesIds: string;


	public eventChooseCategory: Subject<boolean> = new Subject<boolean>();
	public eventGetCheapList: Subject<number> = new Subject<number>();
	public eventSetMaxValue: Subject<number> = new Subject<number>();
	public eventGetCategoryProd: Subject<string> = new Subject<string>();

	_getCheapList = this.eventGetCheapList.asObservable();
	_getCategoryProd = this.eventGetCategoryProd.asObservable();
	_chooseFilters = this.eventChooseCategory.asObservable();
	_setMaxValue = this.eventSetMaxValue.asObservable();

	clickedCategory() {
		this.isClickedCategory = true;
		this.eventChooseCategory.next(this.isClickedCategory);
	}

	getCheapList(lowPrice:number) {
		this.lowPrice = lowPrice;
		this.eventGetCheapList.next(this.lowPrice);
		this.eventSetMaxValue.next(this.lowPrice);
	}

	getCategoryProd(attributesIds: string) {
		this.attributesIds = attributesIds;
		this.eventGetCategoryProd.next(this.attributesIds);
	}
}

