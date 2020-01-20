import { Component, OnInit, Input } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
	selector: 'similar-product-item',
	templateUrl: './similar-product-item.component.html',
	styleUrls: ['./similar-product-item.component.css']
})
export class SimilarProductItemComponent implements OnInit {

	constructor(private routeToCard: Router) { }

	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	openCardThisFlower(e: Event) {
		this.routeToCard.navigate(['card-details', this.flower.productId]);
	}

	ngOnInit() {}

}
