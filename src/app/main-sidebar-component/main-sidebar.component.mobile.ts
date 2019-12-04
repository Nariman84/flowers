import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'main-sidebar',
	templateUrl: './main-sidebar.component.mobile.html',
	styleUrls: ['./main-sidebar.component.mobile.css']
})
export class MainSidebarComponentMobile {

	@Input() isOpenMainSidebar: boolean;
	@Output() onCloseMainSidebar = new EventEmitter();

	constructor() {	}

	closeMainSidebar() {
		this.onCloseMainSidebar.emit();
	}
}