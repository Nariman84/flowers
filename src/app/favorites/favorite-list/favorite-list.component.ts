import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
	public isMobile: boolean;
	public innerWidth: number;

	@Input() favoriteProducts: Flower[];
	@Output() clearFavoriteProductList = new EventEmitter();

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number): void {
		if (innerWidth < 576) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	ngOnInit() {
		this.favoriteProductsList = this.favoriteProducts;

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

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
