import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
	selector: 'user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	public user: any;

	ngOnInit() {
		this.route.parent.data
			.subscribe(
				(data: Data) => {
					this.user = data['user'];
				}
			);
	}
}
