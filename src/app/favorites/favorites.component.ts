import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StateFavoritesService } from '../services/state-favorites.service';

@Component({
	selector: 'favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.css']
})
export class FavoriteProductsComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private stateFavoritesService: StateFavoritesService
	) { }

	public favoritesTitle: string = 'Здесь будут понравившиеся вам товары';
	public favoriteProducts: any[] = [];
	public isEmptyFavorites: boolean = true;

	updateProductList() {
		this.apiService.getFavoriteProducts()
			.subscribe(res => {
				this.favoriteProducts = res;

				if (this.favoriteProducts.length) {
					this.isEmptyFavorites = false;
					this.favoritesTitle = 'Мои избранные товары';
				} else {
					this.isEmptyFavorites = true;
					this.favoritesTitle = 'Здесь будут понравившиеся вам товары';
				}
			});
	}

	ngOnInit() {
		this.updateProductList();

		this.stateFavoritesService._changeStateInFavorite.subscribe(_ => this.updateProductList());
	}

}
