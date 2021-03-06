import { Component, Input } from '@angular/core';
import { Review } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'review-item',
	templateUrl: './review-item.component.html',
	styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent {

	constructor() { }

	@Input() review: Review;
}