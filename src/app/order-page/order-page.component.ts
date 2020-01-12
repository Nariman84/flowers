import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataSuggestionService } from '../services/data-suggestion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
declare let $: any;

@Component({
	selector: 'order-page',
	templateUrl: './order-page.component.html',
	styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, AfterViewInit {

	constructor(
		private dataSuggestionService: DataSuggestionService,
		private router: Router,
		private apiService: ApiService
	) { }

	public basketProducts;
	public isReceivedProduct: boolean;
	public isDataStreet: boolean;
	public isDataHouse: boolean;
	public isSelectItem: boolean = false;
	public isSetStreetValue: boolean = false;
	public isSetHouseValue: boolean = false;
	public isEmptyInputStreet: boolean = true;
	public isEmptyInputHouse: boolean = true;
	public fieldInputStreet: string = "street";
	public fieldInputHouse: string = "house";

	public street: string;
	public house: string;
	public flat: string;

	public suggestionsStreet: string[] = [];
	public suggestionsHouse: string[] = [];
	public suggestionsFullAddress: any[] = [];
	public selectedFullAddress: any;
	public location: Array<{street_fias_id?: string}> | null = null;

	public isRecipient: boolean = false;
	public isCallAllowed: boolean = false;
	public clientName: string = '';
	public clientPhone: string = '';
	public recipientName: string = '';
	public recipientPhone: string = '';
	public comment: string = '';
	public isDisabledRecipientField: boolean = false;

	public today: Date = new Date();
	private currentDate: number = Date.now();
	public selectedDate: string;
	public selectedTime: string;

	public deliveryDates;
	public deliveryTimes: Array<{start: string, end: string}> = [
		{start: '10:00', end: '22:00'},
		{start: '08:00', end: '10:00'},
		{start: '10:00', end: '12:00'},
		{start: '14:00', end: '16:00'},
		{start: '16:00', end: '18:00'},
		{start: '18:00', end: '20:00'},
		{start: '20:00', end: '22:00'}
	];

	public daysWeek:string[] = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
	public monthsYear:string[] = ['января',	'февраля', 'марта', 'апреля', 'мая',	'июня', 'июля',	'августа', 'сентября', 'ноября', 'декабря'];

	getArrDates(today:Date, n:number = 5) {
		let arrDates = [];
		for (let i = 0; i < n; i++) {

			let dt: number;
			dt = today.setDate(today.getDate() + 1);
			let dayWeek = this.getNameDay(dt);
			let monthYear = this.getNameMonth(dt);
			arrDates.push({
				day: dayWeek,
				month: monthYear,
				date: dt
			});
		}
		return arrDates;
	}

	getNameDay (dt: number) {
		if (this.currentDate === dt) {
			return "сегодня";
		} else if ((new Date(this.currentDate)).getDate() === (new Date(dt)).getDate() - 1) {
			return "завтра";
		} else {
			return this.getDayWeek(dt);
		}
	}

	getDayWeek(day: number) {
		let dayWeek = (new Date(day)).getDay();
		let dtName: string;
		switch(dayWeek) {
			case 0:
				dtName = this.daysWeek[0];
				break;
			case 1:
				dtName = this.daysWeek[1];
				break;
			case 2:
				dtName = this.daysWeek[2];
				break;
			case 3:
				dtName = this.daysWeek[3];
				break;
			case 4:
				dtName = this.daysWeek[4];
				break;
			case 5:
				dtName = this.daysWeek[5];
				break;
			case 6:
				dtName = this.daysWeek[6];
				break;
		}
		return dtName;
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

	onChangedRecipient(e: Event) {
		this.isRecipient = (e.target as HTMLInputElement).checked;
		this.recipientName = this.clientName;
		this.recipientPhone = this.clientPhone;
	}

	onChangedCallAllowed(e: Event) {
		this.isCallAllowed = (e.target as HTMLInputElement).checked;
	}

	onInputStreet(e: Event) {
		let fieldValue = (e.target as HTMLInputElement).value;
		if (fieldValue && this.suggestionsStreet) {
			this.isEmptyInputStreet = false;
		}
		this.dataSuggestionService.getDataStreet(fieldValue)
			.subscribe(res => {
				this.suggestionsStreet = res.suggestions.map(data => data.value);
				this.suggestionsStreet.length > 0 ?	(this.isDataStreet = true) : (this.isDataStreet = false);
				}
			)
	}

	onInputHouse(e: Event) {
		if (!this.isEmptyInputStreet) {
			let fieldValue = (e.target as HTMLInputElement).value;
			if (fieldValue && this.suggestionsStreet) {
				this.isEmptyInputHouse = false;
			}
			this.dataSuggestionService.getDataHouse(fieldValue, this.location)
				.subscribe(res => {
					this.suggestionsFullAddress = res.suggestions;
					this.suggestionsHouse = res.suggestions.map(data => data.value);
					this.suggestionsHouse.length > 0 ?	(this.isDataHouse = true) : (this.isDataHouse = false);
				});
		}
	}

	selectValueStreet(street: {location:Array<{street_fias_id?: string}>, index: number, nameStreet: string}) {
		this.isSelectItem = true;
		this.isSetStreetValue = true;

		this.location = street.location;
		this.street = street.nameStreet;
		this.isEmptyInputStreet = false;
		this.isDataStreet = false;
		this.suggestionsStreet.length = 0;
	}

	selectValueHouse(house: {numHouse: string, index: number}) {
		this.isSelectItem = true;
		this.isSetHouseValue = true;

		this.selectedFullAddress = this.suggestionsFullAddress[house.index];
		this.house = house.numHouse;
		this.isEmptyInputHouse = false;
		this.isDataHouse = false;
		this.suggestionsHouse.length = 0;
	}

	onChangeStreet() {
		this.isSetStreetValue = false;
	}

	onChangeHouse() {
		this.isSetHouseValue = false;
	}

	onBlurStreet(e: Event) {
		setTimeout(() => {
			if (this.isDataStreet && !this.isSelectItem) {
				let fieldValue = (e.target as HTMLInputElement).value;
				this.dataSuggestionService.getDataStreet(fieldValue)
					.subscribe(data => {
						this.location = [{street_fias_id: data.suggestions[0].data.street_fias_id}];
						this.street = data.suggestions[0].value;
						this.isDataStreet = false;
					});
			} else if (!this.isDataStreet && !this.isSelectItem && !this.isSetStreetValue) {
				this.street = '';
				this.isEmptyInputStreet = true;

				if (this.house) {
					this.isEmptyInputHouse = true;
					this.house = '';
					this.flat = '';
					this.isDataStreet = false;
				}
			}
		}, 200);

		this.isSelectItem = false;
	}

	onBlurHouse(e: Event) {
		setTimeout(() => {
			if (this.isDataHouse && !this.isSelectItem) {
				let fieldValue = (e.target as HTMLInputElement).value;
				this.dataSuggestionService.getDataHouse(fieldValue, this.location)
					.subscribe(data => {
						this.house = data.suggestions[0].value;
						this.suggestionsHouse.length = 0;
						this.isDataHouse = false;
					});
			} else if (!this.isDataHouse && !this.isSelectItem) {
				this.house = '';
				this.isEmptyInputHouse = true;
				if (this.flat) {
					console.log(this.flat)
					this.flat = '';
				}
			}
		}, 200);

		this.isSelectItem = false;
	}

	getInfoProdInBasket() {
		this.apiService.getProductsInBasket()
			.subscribe(res => {
				this.basketProducts = res;
				if (res) {
					this.isReceivedProduct = true;
				}

			});
	}

	goToPaymentPage() {
		console.log(this.selectedFullAddress)
		let queryData = {
			deliveryDate: (new Date(`${this.selectedDate},${this.selectedTime}`)).toISOString(),
			address: {
				address: this.selectedFullAddress.unrestricted_value,
				country: this.selectedFullAddress.country || 'Россия',
				flat: this.flat,
				geoLat: this.selectedFullAddress.geo_lat || 0,
				geoLon: this.selectedFullAddress.geo_lon || 0
			},
			customerFullName: this.clientName,
			customerPhone: this.clientPhone,
			recipientFullName: this.recipientName,
			recipientPhone: this.recipientPhone,
			comment: this.comment,
			isDeliveryNotifications: true,
			isRecipient: this.isRecipient,
			isCallAllowed: this.isCallAllowed,
			promoCode: ''
		}

		this.apiService.createOrder(queryData).subscribe(res => {
			console.log(res);
		});

		console.log(queryData);
	}

	ngAfterViewInit() {
		$('.selectpicker').selectpicker({});

		$('.selectpicker.delivery-dates').change(() => {
			this.selectedDate = $('.selectpicker.delivery-dates').val();
		});

		$('.selectpicker.delivery-times').change(() => {
			this.selectedTime = $('.selectpicker.delivery-times').val();
		});

		this.selectedDate = $('.selectpicker.delivery-dates').val();
		this.selectedTime = $('.selectpicker.delivery-times').val();
	}

	ngOnInit() {
		this.deliveryDates = this.getArrDates(this.today);
		this.getInfoProdInBasket();
	}
}
