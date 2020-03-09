import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';

@Injectable()
export class AvailableDeliveryTimesService {

	constructor() { }

	public currentHour: number;
	public availableDeliveryTimes: Array<{start: string, end: string, id: number, disabled: boolean}> = [];
	public deliveryTimes: Array<{start: string, end: string, id: number, disabled: boolean}> = [
		{start: '10:00', end: '22:00', id: 1, disabled: false},
		{start: '08:00', end: '10:00', id: 2, disabled: false},
		{start: '10:00', end: '12:00', id: 3, disabled: false},
		{start: '12:00', end: '14:00', id: 4, disabled: false},
		{start: '14:00', end: '16:00', id: 5, disabled: false},
		{start: '16:00', end: '18:00', id: 6, disabled: false},
		{start: '18:00', end: '20:00', id: 7, disabled: false},
		{start: '20:00', end: '22:00', id: 8, disabled: false}
	];

	getAvailableDeliveryTime(selectedDate) {

		this.availableDeliveryTimes.length = 0;

		let selectedDateMonth = (new Date(selectedDate)).getDate();
		let currentDateMonth = (new Date()).getDate();
		let deliveryTimesToday = this.deliveryTimes;

		if (selectedDateMonth === currentDateMonth) {
			this.currentHour = (new Date()).getHours();

			for (let i = 0; i < deliveryTimesToday.length; i++) {
				let startDeliveryHour = +this.deliveryTimes[i].start.split(':')[0];

				if (startDeliveryHour <= this.currentHour + 2) {
					this.deliveryTimes[i].disabled = true;
				}
			}

		} else {
			for (let i = 0; i < this.deliveryTimes.length; i++) {
				this.deliveryTimes[i].disabled = false;
			}
		}

		this.availableDeliveryTimes = [...this.deliveryTimes];
		return Observable.of(this.availableDeliveryTimes);
	}
}
