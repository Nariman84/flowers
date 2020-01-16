import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'popup-form',
	templateUrl: './popup-form.component.html',
	styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private router: Router,
		private modalService: NgbModal
	) { }

	loginSocial(e: Event) {
		let socialNetwork = (e.target as HTMLElement).id;

		this.apiService.authorizeSocial(socialNetwork)
			.subscribe(
				data => {
					this.apiService.setStatusAuth(true);
					this.router.navigateByUrl('profile');
				}
			);
	}

	onAuthorize() {
		this.apiService.setStatusAuth(true);
		this.modalService.dismissAll();
		this.router.navigateByUrl('profile');
	}

	closeModal() {
		this.modalService.dismissAll();
	}

	ngOnInit() { }
}
