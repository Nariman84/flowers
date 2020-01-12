import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
	selector: 'user-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	public orders: any[] = [];

	ngOnInit() {
		this.route.data
			.subscribe(
				(data: Data) => {
					this.orders = data['orders'];
				}
			);
	}

}
