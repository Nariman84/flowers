import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable()
export class BasketService {

	constructor(private apiService: ApiService) { }

	public eventConfirmDeletion: Subject<any> = new Subject<any>();
	public eventChangeQuantity: Subject<any> = new Subject<any>();
	public eventUpdateTotalSum: Subject<any> = new Subject<any>();

	_confirmDeletion = this.eventConfirmDeletion.asObservable();
	_changeQuantity = this.eventChangeQuantity.asObservable();
	_updateTotalSum = this.eventUpdateTotalSum.asObservable();

	onClickAddToBasket(productId: number, count: number) {
		this.apiService.addProductInBasket(productId).subscribe();
		this.apiService.setQuantityToBuy(productId, count).subscribe();
	}

	getProductsInBasket() {
		this.eventConfirmDeletion.next();
	}

	removeProductFromBasket() {
		this.apiService.getProductsInBasket();
	}

	changeQuantityProductInBasket() {
		this.eventChangeQuantity.next();
	}

	updateTotalSum() {
		this.eventUpdateTotalSum.next();
	}
}