import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Review } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

	constructor(private apiService: ApiService) { }

	reviews: Review[] = [];

	ngOnInit() {
		this.apiService.getReviews()
			.subscribe(res => {
				this.reviews = res;
			});
		}
}