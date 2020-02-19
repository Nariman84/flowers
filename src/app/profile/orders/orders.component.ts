import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'user-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private authService: AuthService
	) { }

	public orders: any[] = [];
	public isEmptyOrderList: boolean = true;
	private innerWidth: number;
	public isMobile: boolean;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth < 768) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}
	}

	ngOnInit() {
		if (this.authService.isUserAuth) {
			this.activatedRoute.data
				.subscribe(
					(data: Data) => {
						if (data.orders.length) {
							this.orders = data['orders'];
							this.isEmptyOrderList = false;
						}
					}
				);
		}

		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}