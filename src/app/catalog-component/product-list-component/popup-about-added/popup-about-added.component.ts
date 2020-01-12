import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'popup-about-added',
	templateUrl: './popup-about-added.component.html',
	styleUrls: ['./popup-about-added.component.css']
})
export class PopupAboutAddedComponent implements OnInit {

	constructor() { }

	public price: string;

	@Input() flower: Flower;
	@Output() closePopupAdded = new EventEmitter();

	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	closePopup() {
		this.closePopupAdded.emit();
	}

	ngOnInit() {
		console.log(this.flower);
		if (this.flower) {
			this.price = this.flower.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',00';
		}
	}
}