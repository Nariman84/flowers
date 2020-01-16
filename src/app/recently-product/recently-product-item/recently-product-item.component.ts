import { Component, OnInit, Input } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { BasketService } from 'src/app/services/basket.service';

@Component({
	selector: 'recently-product-item',
	templateUrl: './recently-product-item.component.html',
	styleUrls: ['./recently-product-item.component.css']
})
export class RecentlyProductItemComponent implements OnInit {

	constructor(private basketService: BasketService) { }

	@Input() flower: Flower;

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName640}) 50% 50%/cover no-repeat`;
	}

	addToBasket(e: Event) {
		let quantity: number = this.flower.inBasket + 1;
		this.basketService.onClickAddToBasket(this.flower.productId, quantity, this.flower.inBasket);
	}

	ngOnInit() {
	}

}
