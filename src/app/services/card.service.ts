import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CardService {

	constructor() { }

	public eventGetPhoto: Subject<any> = new Subject<any>();

	getPhoto$ = this.eventGetPhoto.asObservable();

	getProductPhoto(id: number) {
		this.eventGetPhoto.next();
	}
}
