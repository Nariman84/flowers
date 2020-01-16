import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable()
export class StateFavoritesService {

	constructor(private apiService: ApiService) { }

	public isFavorite: boolean;
	public productId: number;

	public eventChangeStateInFavorite: Subject<any> = new Subject<any>();
	public eventChangeAmountInFavorite: Subject<boolean> = new Subject<boolean>();

	changeStateInFavorite$ = this.eventChangeStateInFavorite.asObservable();
	changeAmountInFavorite$ = this.eventChangeAmountInFavorite.asObservable();

	changeStateInFavorite(id: number) {
		this.eventChangeStateInFavorite.next(id);
	}

	toggleProductInFavorites(productId: number, inFavorites: boolean) {
		if (inFavorites) {
			this.addProductToFavorites(productId);
			this.increaseInFavorites();
		} else {
			this.removeProductToFavorites(productId);
			this.decreaseInFavorites();
		}
	}

	addProductToFavorites(productId: number) {
		this.apiService.addToFavorites(productId).subscribe();
	}

	removeProductToFavorites(productId: number) {
		this.apiService.removeFromFavorites(productId).subscribe();
	}

	increaseInFavorites() {
		this.eventChangeAmountInFavorite.next(true);
	}

	decreaseInFavorites() {
		this.eventChangeAmountInFavorite.next(false);
	}
}
