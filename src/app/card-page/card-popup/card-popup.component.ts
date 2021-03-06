import { Component, OnInit, Input, HostListener } from '@angular/core';
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
	public isDesktop: boolean;
	public innerWidth: number;

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
			this.basketService.changeQuantityProductInBasket(this.flower.productId, quantity);
		}
	}

	increase(): void {
		this.count++;
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
		}
	}

	onChangeCount(e) {
		this.count = +(e.target as HTMLInputElement).value;
		if (this.count < 0) {
			this.count = 0;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	getScreenState(innerWidth:number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}
