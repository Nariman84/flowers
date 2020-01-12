import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Router  } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RouteTrackingService } from '../services/route-tracking.service';
import { ApiService } from '../services/api.service';
import { LoginComponent } from '../popup-form/login/login.component';
import { PopupFormComponent } from '../popup-form/popup-form.component';

@Component({
	selector: 'header-component',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(
		private router: Router,
		private routeTrackingService: RouteTrackingService,
		private modalService: NgbModal
	) {	}

	public isOpenMainSidebar: boolean;
	public innerWidth: number;
	public isDesktop: boolean;
	public isVisiblePopupProfile: boolean;

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		if (this.innerWidth > 768) {
			this.isOpenMainSidebar = false;
		}
		this.getScreenState(this.innerWidth);
	}

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number):void {
		if (innerWidth < 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	//закрыть сайдбар с навигацией
	closeMainSidebar():void {
		this.isOpenMainSidebar = false;
	}

	//открыть сайдбар с навигацией
	openNav():void {
		this.isOpenMainSidebar = true;
	}

	onClickToProfileIcon() {
      this.modalService.open(PopupFormComponent);
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.routeTrackingService._changeVisiblePopupProfile
			.subscribe(data => {
				this.isVisiblePopupProfile = data;
			});
	}

}
