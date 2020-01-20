import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable()
export class BasketService {

	constructor(private apiService: ApiService) { }

	public isRemove: boolean;

	public eventConfirmDeletion: Subject<any> = new Subject<any>();
	public eventChangeAmountInBasket: Subject<any> = new Subject<any>();
	public eventUpdateTotalSum: Subject<any> = new Subject<any>();
	public eventGetGrandTotalSum: Subject<any> = new Subject<any>();
	public eventRemoveProductFromBasket: Subject<any> = new Subject<any>();
	public eventClearAmountInHeader: Subject<any> = new Subject<any>();

	confirmDeletion$ = this.eventConfirmDeletion.asObservable();
	updateTotalSum$ = this.eventUpdateTotalSum.asObservable();
	getGrandTotalCost$ = this.eventGetGrandTotalSum.asObservable();
	changeAmountInBasket$ = this.eventChangeAmountInBasket.asObservable();
	toggleRemoveProductFromBasket$ = this.eventRemoveProductFromBasket.asObservable();
	clearAmountInHeader$ = this.eventClearAmountInHeader.asObservable();

	onClickAddToBasket(productId: number, count: number, amountInBasket: number) {
		if (amountInBasket) {
			this.apiService.setQuantityToBuy(productId, count).subscribe();
		} else if (!amountInBasket && count > 1) {
			this.apiService.addProductInBasket(productId).subscribe(res => {
				this.apiService.setQuantityToBuy(productId, count).subscribe();
			});
			this.eventChangeAmountInBasket.next(true);

		} else if (!amountInBasket && count === 1) {
			this.apiService.addProductInBasket(productId).subscribe();
			this.eventChangeAmountInBasket.next(true);
		}
	}

	confirmDeletion(id: number) {
		this.eventConfirmDeletion.next(id);
	}

	clearAmountInHeader() {
		this.eventClearAmountInHeader.next();
	}

	removeProductFromBasket(totalSum: number) {
		this.isRemove = true;
		this.eventChangeAmountInBasket.next(false);
		this.eventRemoveProductFromBasket.next({ isRemove: true, totalSum: totalSum });
	}

	cancelDeletion(totalSum: number) {
		this.isRemove = false;
		this.eventChangeAmountInBasket.next(true);
		this.eventRemoveProductFromBasket.next({ isRemove: false, totalSum: totalSum });
	}

	changeQuantityProductInBasket(productId: number, quantity: number) {
		this.apiService.setQuantityToBuy(productId, quantity).subscribe();
	}

	updateTotalSum(price: number, id: number) {
		this.eventUpdateTotalSum.next({price: price, id: id});
	}

	getGrandTotalCost(productsTotalCost) {
		let grandTotalCost = 0;
		for (let id in productsTotalCost) {
			grandTotalCost += productsTotalCost[id];
		}
		this.eventGetGrandTotalSum.next(grandTotalCost);
	}
}