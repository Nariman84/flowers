import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'popup-form',
	templateUrl: './popup-form.component.html',
	styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {
  @Input() isLoginItemActive: boolean;
  @Input() isRegistrationItemActive: boolean;

	constructor(
		private apiService: ApiService,
		private router: Router,
	) { }

	loginSocial(e: Event) {
		let socialNetwork = (e.target as HTMLElement).id;

		this.apiService.authorizeSocial(socialNetwork)
			.subscribe(
				data => {
					// this.apiService.getStatusAuth(true);
					// this.router.navigateByUrl('profile');
				}
			);
	}

	ngOnInit() {
	}

}
