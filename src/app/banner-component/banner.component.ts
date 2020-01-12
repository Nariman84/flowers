import { Component, Input } from '@angular/core';

@Component({
	selector: 'banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})
export class BannerComponent {

	constructor() {	}

	@Input() smallBanner: string;
	@Input() largeBanner: string;
	@Input() bannerTitle: string;

	getBackgroundStyle() {
		return `url(/${this.largeBanner}) 30% center/cover`;
	}
}