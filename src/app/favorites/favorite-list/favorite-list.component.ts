import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'favorite-list',
	templateUrl: './favorite-list.component.html',
	styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

	constructor() { }

	@Input() favoriteProducts;

	ngOnInit() {
	}

}
