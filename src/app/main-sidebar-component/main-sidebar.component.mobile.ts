import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupFormComponent } from '../popup-form/popup-form.component';

@Component({
	selector: 'main-sidebar',
	templateUrl: './main-sidebar.component.mobile.html',
	styleUrls: ['./main-sidebar.component.mobile.css']
})
export class MainSidebarComponentMobile {

	@Input() isOpenMainSidebar: boolean;
	@Output() onCloseMainSidebar = new EventEmitter();

	public isOpenProfileMenu: boolean;

	constructor(
		private apiService: ApiService,
		private modalService: NgbModal
	) {	}

	closeMainSidebar(): void {
		this.onCloseMainSidebar.emit();
	}

	backToNav() {
		this.isOpenProfileMenu = false;
	}

	openProfileMenu() {
		if (!this.apiService.isAuth) {
			this.closeMainSidebar();
			this.modalService.open(PopupFormComponent);
		} else {
			this.isOpenProfileMenu = true;
		}
	}
}