import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MainSidebarService {

	constructor() { }

	public eventScrollToAboutUs: Subject<any> = new Subject<any>();
	public eventScrollToCategory: Subject<any> = new Subject<any>();

	scrollToAboutUs$ = this.eventScrollToAboutUs.asObservable();
	scrollToCategory$ = this.eventScrollToCategory.asObservable();

	scrollToAboutUs() {
		this.eventScrollToAboutUs.next();
	}

	scrollToCategory() {
		this.eventScrollToCategory.next();
	}
}