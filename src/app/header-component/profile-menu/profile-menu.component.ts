import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTrackingService } from 'src/app/services/route-tracking.service';

@Component({
	selector: 'profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

	constructor(
	  private route: Router
	) { }

	redirectToProfileInfo(e) {
		e.stopPropagation();

		this.route.navigate(['profile', 'user-info']);

	}

	redirectToOrders(e) {
		e.stopPropagation();

		this.route.navigate(['profile', 'orders']);
	}

	ngOnInit() {	}
}