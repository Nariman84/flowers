import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

	constructor() { }

	public eventAuthorize: Subject<any> = new Subject<any>();

	authorize$ = this.eventAuthorize.asObservable();

	loginProfile() {
		this.eventAuthorize.next();
	}

}
