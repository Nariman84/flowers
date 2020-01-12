import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'card-popup',
	templateUrl: './card-popup.component.html',
	styleUrls: ['./card-popup.component.css']
})
export class CardPopupComponent implements OnInit {

	constructor() { }

	@Input() flower: Flower;
	@Input() price: string;

	@Output() hidePopup = new EventEmitter;


	getBackgroundStyle() {
		return `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}

	closePopup() {
		this.hidePopup.emit();
	}

	ngOnInit() { }

}
