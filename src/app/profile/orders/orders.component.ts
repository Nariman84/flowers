import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'user-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private apiService: ApiService
	) { }

	public orders: any[] = [];
	public isEmptyOrderList: boolean = true;

	ngOnInit() {
		if (this.apiService.isAuth) {
			this.route.data
				.subscribe(
					(data: Data) => {
						if (data.orders.length) {
							this.orders = data['orders'];
							this.isEmptyOrderList = false;
						}
					}
				);
		}
	}
}