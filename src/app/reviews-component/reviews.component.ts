import {Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

	constructor(private apiService: ApiService) { }

	reviews: any = [];

	setActiveClass(i) {
		console.log(i);
	}

	ngOnInit() {
		this.apiService.getReviews()
			.subscribe(res => {
				this.reviews = res;
			});
		}
}