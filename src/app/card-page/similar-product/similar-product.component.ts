import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Flower } from 'src/app/shared/interfaces/interfaces';

@Component({
	selector: 'similar-product',
	templateUrl: './similar-product.component.html',
	styleUrls: ['./similar-product.component.css']
})
export class SimilarProductComponent implements OnInit {

	constructor(private apiService: ApiService) { }

	@Input() id: string;

	similarProducts: Flower[] = [];
	public innerWidth: number;
	public isDesktop: boolean;

	slideConfigSimilarMobile = {
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: false,
		infinite: false,
		arrows: false
	};

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		this.apiService.getSimilarProducts(this.id)
			.subscribe(similarProducts => {
				this.similarProducts = similarProducts;
			});

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

}