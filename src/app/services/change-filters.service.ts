import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ChangeFilterService {

	constructor() {	}

	public isChecked: boolean;
	public id: string;

	public eventChangeFilter: Subject<{isChecked: boolean, id: string}> = new Subject<{isChecked: boolean, id: string}>();
	public eventChangePriceFilter: Subject<{minValue: number, maxValue: number}> = new Subject<{minValue: number, maxValue: number}>();
	public eventClickSearchButton: Subject<any> = new Subject<any>();
	// public eventChangeSortFilter: Subject<boolean> = new Subject<boolean>();

	_changeFilter = this.eventChangeFilter.asObservable();
	_changePriceFilter = this.eventChangePriceFilter.asObservable();
	_searchFlowers = this.eventClickSearchButton.asObservable();

	onChangeFilter(isChecked: boolean, id: string): void {
		this.eventChangeFilter.next({isChecked: isChecked, id: id});
	}

	onChangePriceFilter(minValue: number, maxValue: number) {
		this.eventChangePriceFilter.next({minValue: minValue, maxValue: maxValue});
	}

	onClickSearchButton() {
		this.eventClickSearchButton.next();
	}
}