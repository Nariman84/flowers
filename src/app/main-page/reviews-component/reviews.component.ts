import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Review } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

	constructor(private apiService: ApiService) { }

	reviews: Review[] = [];

	SlideOptions = {
		items: 1,
		margin: 10,
		dots: true,
		nav: true,
		loop: true,
		autoplay: true,
		autoplayTimeout: 10000,
		slideTransition: 'ease-in-out',
		smartSpeed: 600,
		navText: [
			`<img class="img-responsive large" src="assets/img/button_left.svg">
			<img class="img-responsive small" src="assets/img/left_mobile.png">`,
			`<img class="img-responsive large" src="assets/img/button_right.svg">
			<img class="img-responsive small" src="assets/img/right_mobile.png">`
		]
	};
	CarouselOptions = { items: 3, dots: true, nav: true };

	ngOnInit() {
		this.apiService.getReviews()
			.subscribe(res => {
				this.reviews = res;
			});
		}
}