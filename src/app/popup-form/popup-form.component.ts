import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'popup-form',
	templateUrl: './popup-form.component.html',
	styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private router: Router,
		private profileService: ProfileService,
		private modalService: NgbModal,
		private authService: AuthService
	) { }

	public innerWidth: number;
	public isDesktop: boolean;

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
		this.profileService.changeVisiblePopupProfile(true);
		this.authService.loginProfile();
		this.modalService.dismissAll();
		this.router.navigateByUrl('profile');
	}

	closeModal() {
		this.modalService.dismissAll();
	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или mobile)
	getScreenState(innerWidth:number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
