import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable()
export class StateFavoritesService {

	constructor(private apiService: ApiService) { }

	public isFavorite: boolean;
	public productId: number;

	public eventChangeStateInFavorite: Subject<any> = new Subject<any>();

	_changeStateInFavorite = this.eventChangeStateInFavorite.asObservable();

	changeStateInFavorite() {
		this.eventChangeStateInFavorite.next();
	}

	toggleProductInFavorites(productId: number, inFavorites: boolean) {
		this.productId = productId;
		if (!inFavorites) {
			this.addProductToFavorites();
		} else {
			this.removeProductToFavorites();
		}
	}

	addProductToFavorites() {
		this.apiService.addToFavorites(this.productId).subscribe();
	}

	removeProductToFavorites() {
		this.apiService.removeFromFavorites(this.productId).subscribe();
	}
}
