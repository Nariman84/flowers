import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'orders-item',
	templateUrl: './orders-item.component.html',
	styleUrls: ['./orders-item.component.css']
})
export class OrdersItemComponent implements OnInit {

	constructor() { }

	public statusOrder: string;
	public statusColor: string;
	public deliveryDate: string;
	public isCompleted: boolean;

	public monthsYear:string[] = ['января',	'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря'];

	@Input() order;

	getBackgroundStyle() {
		return `url(${this.order.photo.fileName130}) 50% 50%/cover no-repeat`;
	}

	getStatusColor(status: string) {
		switch(status) {
			case 'Выполнен':
				this.statusColor = '#27AE60';
				this.isCompleted = true;
				break;
			case 'Отменен':
				this.statusColor = '#C4C4C4';
				break;
			case 'В работе':
				this.statusColor = '#F3B23F';
				break;
		}
	}

	ngOnInit() {
		this.statusOrder = this.order.status.split(', ')[0];
		this.getStatusColor(this.statusOrder);
		this.deliveryDate = this.getDeliveryDate(this.order.deliveryDate);
console.log(this.order)
	}

	getDeliveryDate(date: string) {
		let dayMonth = new Date(date).getDate();
		let monthNum = new Date(date).getMonth();
		let year = new Date(date).getFullYear();
		let monthName = this.getNameMonth(monthNum);
		return `${dayMonth} ${monthName} ${year}`;
	}

	getNameMonth(day: number) {
		let monthNum = (new Date(day)).getMonth();
		let monthName: string;
		switch(monthNum) {
			case 0:
				monthName = this.monthsYear[0];
				break;
			case 1:
				monthName = this.monthsYear[1];
				break;
			case 2:
				monthName = this.monthsYear[2];
				break;
			case 3:
				monthName = this.monthsYear[3];
				break;
			case 4:
				monthName = this.monthsYear[4];
				break;
			case 5:
				monthName = this.monthsYear[5];
				break;
			case 6:
				monthName = this.monthsYear[6];
				break;
			case 7:
				monthName = this.monthsYear[7];
				break;
			case 8:
				monthName = this.monthsYear[8];
				break;
			case 9:
				monthName = this.monthsYear[9];
				break;
			case 10:
				monthName = this.monthsYear[10];
				break;
			case 11:
				monthName = this.monthsYear[11];
				break;
		}
		return monthName;
	}

}