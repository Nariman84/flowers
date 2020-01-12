import { Component, OnInit, Input } from '@angular/core';
import { Flower } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: '[card-header]',
	templateUrl: './card-header.component.html',
	styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

	constructor() { }

	public backgroundStyle: string;

	@Input() flower: Flower;
	@Input() price: string;
	@Input() isVisibleCardHeader: boolean;

	ngOnInit() {
			console.log('this.flower', this.flower)
			this.backgroundStyle = `url(${this.flower.photos[0].fileName130}) 50% 50%/cover no-repeat`;
	}
}