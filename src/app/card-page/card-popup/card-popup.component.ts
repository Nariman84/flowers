import { Component, OnInit, Input } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';

@Component({
	selector: 'card-popup',
	templateUrl: './card-popup.component.html',
	styleUrls: ['./card-popup.component.css']
})
export class CardPopupComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private router: Router,
		private basketService: BasketService
	) { }

	public count: number = 1;

	@Input() flower: Flower;
	@Input() price: string;


	getBackgroundStyle(): string {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	closePopup(): void {
		this.modalService.dismissAll(CardPopupComponent);
		this.setQuantityToBuy();
	}

	gotToBasket(): void {
		this.router.navigate(['basket']);
		this.modalService.dismissAll(CardPopupComponent);

		this.setQuantityToBuy();
	}

	setQuantityToBuy() {
		if (this.count > 0) {
			let quantity: number = this.count + this.flower.inBasket;
			if (quantity > this.flower.pieces) {
				quantity = this.flower.pieces;
			}
			this.basketService.changeQuantityProductInBasket(this.flower.productId, quantity);
		}
	}

	increase(): void {
		if (this.count < this.flower.pieces) {
			this.count++;
		}
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
		}
	}

	onChangeCount() {
		if (this.count < 0) {
			this.count = 0;
		}

		if (this.count > this.flower.pieces) {
			this.count = this.flower.pieces;
		}
	}

	ngOnInit() {
	}

}
