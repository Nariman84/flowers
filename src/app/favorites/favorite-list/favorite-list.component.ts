import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { StateFavoritesService } from 'src/app/services/state-favorites.service';

@Component({
	selector: 'favorite-list',
	templateUrl: './favorite-list.component.html',
	styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

	constructor(
		private stateFavoritesService: StateFavoritesService
	) { }

	private favoriteProductsList: Flower[] = [];

	@Input() favoriteProducts: Flower[];
	@Output() clearFavoriteProductList = new EventEmitter();

	ngOnInit() {
		this.favoriteProductsList = this.favoriteProducts;

		this.stateFavoritesService.changeStateInFavorite$.subscribe(id => {
			for (var i = 0; i < this.favoriteProductsList.length; i++) {
				if (this.favoriteProductsList[i].productId == id) {
					this.favoriteProductsList.splice(i, 1);
					break;
				}
			}

			if (!this.favoriteProductsList.length) {
				this.clearFavoriteProductList.emit();
			}
		})
	}
}
