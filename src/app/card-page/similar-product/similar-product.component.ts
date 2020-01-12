import { Component, OnInit, Input } from '@angular/core';
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

	ngOnInit() {
		this.apiService.getSimilarProducts(this.id)
			.subscribe(similarProducts => {
				this.similarProducts = similarProducts;
			});
	}

}