import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';


@Injectable()
export class BasketService {

	constructor(
		private apiService: ApiService,
		private router: Router
	) { }

	public isRemove: boolean;

	public eventConfirmDeletion: Subject<any> = new Subject<any>();
	public eventChangeAmountInBasket: Subject<any> = new Subject<any>();
	public eventSetAmountInBasket: Subject<any> = new Subject<any>();
	public eventUpdateTotalSum: Subject<any> = new Subject<any>();
	public eventGetGrandTotalSum: Subject<any> = new Subject<any>();
	public eventChangeStateBasket: Subject<any> = new Subject<any>();
	public eventAddRecentlyInBasket: Subject<any> = new Subject<any>();

	confirmDeletion$ = this.eventConfirmDeletion.asObservable();
	updateTotalSum$ = this.eventUpdateTotalSum.asObservable();
	getGrandTotalCost$ = this.eventGetGrandTotalSum.asObservable();
	changeAmountInBasket$ = this.eventChangeAmountInBasket.asObservable();
	setAmountInBasket$ = this.eventSetAmountInBasket.asObservable();
	changeStateBasket$ = this.eventChangeStateBasket.asObservable();
	addRecentlyToBasket$ = this.eventAddRecentlyInBasket.asObservable();

	onClickAddToBasket(productId: number, count: number, amountInBasket: number) {
		if (amountInBasket) {
			this.apiService.setQuantityToBuy(productId, count).subscribe();
		} else if (!amountInBasket && count > 1) {
			this.apiService.addProductInBasket(productId).subscribe(_ => {

				this.apiService.setQuantityToBuy(productId, count).subscribe(_ => {
					this.eventChangeAmountInBasket.next();

				});
			});

		} else if (!amountInBasket && count === 1) {
			this.apiService.addProductInBasket(productId).subscribe(_ => {
				this.eventChangeAmountInBasket.next();

				if (this.router.url.indexOf('basket') !== -1) {
					this.addRecentlyToBasket();
				}
			});
		}
	}

	addRecentlyToBasket() {
		this.eventAddRecentlyInBasket.next();
	}

	confirmDeletion(id: number) {
		this.eventConfirmDeletion.next(id);

		this.apiService.removeProductFromBasket(id).subscribe(res => {

			if (res.status) {
				this.eventChangeAmountInBasket.next();
			}
		});
	}

	deleteProdFromBasket() {
		this.isRemove = true;
		this.setAmountInBasket();
	}

	cancelDeletion() {
		this.isRemove = false;
		this.eventChangeAmountInBasket.next();
		this.setAmountInBasket();
	}

	setAmountInBasket() {
		this.eventSetAmountInBasket.next(this.isRemove);
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