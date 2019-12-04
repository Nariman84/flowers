import {Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
	selector: '[product-list]',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	flowers: any[] = [];

	constructor(private apiService: ApiService) { }

	ngOnInit() {
	// 	this.apiService.getFlowers()
	// 		.subscribe(data => {
	// 			this.flowers = data;
	// 			console.log(this.flowers);
	// 		});
	}
}