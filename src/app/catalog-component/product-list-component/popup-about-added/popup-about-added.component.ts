import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
	selector: 'popup-about-added',
	templateUrl: './popup-about-added.component.html',
	styleUrls: ['./popup-about-added.component.css']
})
export class PopupAboutAddedComponent implements OnInit {

	constructor(private router: Router) { }

	public price: number;

	@Input() flower: Flower;
	@Output() closePopupAdded = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	goToBasket() {
		this.router.navigateByUrl('/basket');
	}

	closePopup() {
		this.closePopupAdded.emit();
	}

	ngOnInit() {
		if (this.flower) {
			this.price = this.flower.price;
		}
	}
}