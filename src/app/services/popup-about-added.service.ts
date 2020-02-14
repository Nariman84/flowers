import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Flower } from '../shared/interfaces/interfaces';

@Injectable()
export class PopupAboutAddedService {

	constructor() { }

	public eventClickAddToBasket: Subject<any> = new Subject<any>();
	public eventClosePopup: Subject<any> = new Subject<any>();

	onClickAddToBasket$ = this.eventClickAddToBasket.asObservable();
	closePopup$ = this.eventClosePopup.asObservable();

	onClickAddToBasket(flower: Flower) {
		this.eventClickAddToBasket.next(flower);
	}

	closePopup() {
		this.eventClosePopup.next();
	}
}