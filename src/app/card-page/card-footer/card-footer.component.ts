import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: '[card-footer]',
	templateUrl: './card-footer.component.html',
	styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {

	constructor() { }

	@Input() price: string;
	@Input() isVisibleCardFooter: boolean;
	@Input() isAddedToBasket: string;

	@Output() addToBasket = new EventEmitter();

	addProductToBasket() {
		this.addToBasket.emit();
	}

	ngOnInit() {
	}

}