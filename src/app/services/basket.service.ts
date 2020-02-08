import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Flower } from '../shared/interfaces/interfaces';


@Injectable()
export class BasketService {

	constructor(private apiService: ApiService) { }

	public isRemove: boolean;

	public eventConfirmDeletion: Subject<any> = new Subject<any>();
	public eventChangeAmountInBasket: Subject<any> = new Subject<any>();
	public eventUpdateTotalSum: Subject<any> = new Subject<any>();
	public eventGetGrandTotalSum: Subject<any> = new Subject<any>();
	public eventRemoveProductFromBasket: Subject<any> = new Subject<any>();
	public eventChangeStateBasket: Subject<any> = new Subject<any>();

	confirmDeletion$ = this.eventConfirmDeletion.asObservable();
	updateTotalSum$ = this.eventUpdateTotalSum.asObservable();
	getGrandTotalCost$ = this.eventGetGrandTotalSum.asObservable();
	changeAmountInBasket$ = this.eventChangeAmountInBasket.asObservable();
	toggleRemoveProductFromBasket$ = this.eventRemoveProductFromBasket.asObservable();
	changeStateBasket$ = this.eventChangeStateBasket.asObservable();

	onClickAddToBasket(productId: number, count: number, amountInBasket: number) {
		if (amountInBasket) {
			this.apiService.setQuantityToBuy(productId, count).subscribe(_ => {
				this.eventChangeAmountInBasket.next();
			});
		} else if (!amountInBasket && count > 1) {
			this.apiService.addProductInBasket(productId).subscribe(res => {
				this.apiService.setQuantityToBuy(productId, count).subscribe(_ => {
					this.eventChangeAmountInBasket.next();
				});
			});

		} else if (!amountInBasket && count === 1) {
			this.apiService.addProductInBasket(productId).subscribe(_ => {
				this.eventChangeAmountInBasket.next();
			});
		}
	}

	confirmDeletion(id: number) {
		this.eventConfirmDeletion.next(id);

		this.apiService.removeProductFromBasket(id).subscribe(_ => {
			this.eventChangeAmountInBasket.next();
		});
	}

	removeProductFromBasket(totalSum: number) {
		this.isRemove = true;
		this.eventRemoveProductFromBasket.next({ isRemove: true, totalSum: totalSum });
	}

	cancelDeletion(totalSum: number) {
		this.isRemove = false;
		this.eventChangeAmountInBasket.next();
		this.eventRemoveProductFromBasket.next({ isRemove: false, totalSum: totalSum });
	}

	changeQuantityProductInBasket(productId: number, quantity: number) {
		this.apiService.setQuantityToBuy(productId, quantity).subscribe();
	}

	updateTotalSum(price: number, id: number) {
		this.eventUpdateTotalSum.next({price: price, id: id});
	}

	changeStateBasket() {
		this.eventChangeStateBasket.next();
	}

	getGrandTotalCost(productsTotalCost) {
		let grandTotalCost = 0;
		for (let id in productsTotalCost) {
			grandTotalCost += productsTotalCost[id];
		}
		this.eventGetGrandTotalSum.next(grandTotalCost);
	}
}