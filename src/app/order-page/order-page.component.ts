import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ApiSuggestionService } from '../services/api-suggestion.service';
import { DataSuggestionService } from 'src/app/services/data-suggestion.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../services/api.service';
declare let $: any;

@Component({
	selector: 'order-page',
	templateUrl: './order-page.component.html',
	styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, AfterViewInit {

	constructor(
		private apiSuggestionService: ApiSuggestionService,
		private dataSuggestionService: DataSuggestionService,
		private router: Router,
		private apiService: ApiService
	) { }

	public basketProducts;
	public isReceivedProduct: boolean;
	public isDataStreet: boolean;
	public isDataHouse: boolean;
	public isSetStreetValue: boolean = false;
	public isSetHouseValue: boolean = false;
	public isEmptyInputStreet: boolean = true;
	public isEmptyInputHouse: boolean = true;
	public fieldInputStreet: string = "street";
	public fieldInputHouse: string = "house";
	private innerWidth: number;
	public isDesktop: boolean;
	public isTablet: boolean;

	public street: string;
	public house: string;
	public flat: string;

	public suggestionsStreet: string[] = [];
	public suggestionsHouse: string[] = [];
	public suggestionsFullAddress: any[] = [];
	public selectedFullAddress: any;
	public location: Array<{street_fias_id?: string}> | null = null;
	public geo_lat: string;
	public geo_lon: string;

	public isRecipient: boolean = false;
	public isCallAllowed: boolean = false;
	public clientName: string = '';
	public clientPhone: string = '';
	public recipientName: string = '';
	public recipientPhone: string = '';
	public comment: string = '';
	public isDisabledRecipientField: boolean = false;
	public promoCode: string = '';

	public today: Date = new Date();
	private currentDate: number = Date.now();
	public selectedDate: string;
	public selectedTime: string;

	public deliveryDates;
	public deliveryTimes: Array<{start: string, end: string}> = [
		{start: '10:00', end: '22:00'},
		{start: '08:00', end: '10:00'},
		{start: '10:00', end: '12:00'},
		{start: '12:00', end: '14:00'},
		{start: '14:00', end: '16:00'},
		{start: '16:00', end: '18:00'},
		{start: '18:00', end: '20:00'},
		{start: '20:00', end: '22:00'}
	];

	public daysWeek:string[] = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
	public monthsYear:string[] = ['января',	'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря'];

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
		this.apiSuggestionService.getDataStreet(fieldValue)
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
			this.apiSuggestionService.getDataHouse(fieldValue, this.location)
				.subscribe(res => {
					this.suggestionsFullAddress = res.suggestions;
					this.suggestionsHouse = res.suggestions.map(data => data.value);
					this.suggestionsHouse.length > 0 ?	(this.isDataHouse = true) : (this.isDataHouse = false);
				});
		}
	}

	selectValueStreet(street: {location:Array<{street_fias_id?: string}>, index: number, nameStreet: string}) {
		this.isSetStreetValue = true;
		this.location = street.location;
		this.street = street.nameStreet;
		this.isEmptyInputStreet = false;
		this.isDataStreet = false;
		this.suggestionsStreet.length = 0;
	}

	selectValueHouse(house: {numHouse: string, index: number, geo_lat: string, geo_lon: string}) {
		this.isSetHouseValue = true;

		this.selectedFullAddress = this.suggestionsFullAddress[house.index];
		this.house = house.numHouse;
		this.geo_lat = house.geo_lat;
		this.geo_lon = house.geo_lon;
		this.isEmptyInputHouse = false;
		this.isDataHouse = false;
		this.suggestionsHouse.length = 0;
	}

	onChangeStreet(e: Event) {
		this.isSetStreetValue = false;
	}

	onChangeHouse(e: Event) {
		this.isSetHouseValue = false;
	}

	onBlurStreet(e: Event) {
		this.dataSuggestionService.getStateSelectItem().subscribe(data => {

			if (this.isDataStreet && !data) {
				let fieldValue = (e.target as HTMLInputElement).value;
				this.dataSuggestionService.getDataStreet(fieldValue);

			} else if (!this.isDataStreet && !data && !this.isSetStreetValue) {
				this.street = '';
				this.isEmptyInputStreet = true;
			}

			if (this.house) {
				this.isEmptyInputHouse = true;
				this.house = '';
				this.flat = '';
				this.isDataStreet = false;
				}

			this.dataSuggestionService.setStateSelectItem(false);
		});
	}

	onBlurHouse(e: Event) {
		this.dataSuggestionService.getStateSelectItem().subscribe(data => {

			if (this.isDataHouse && !data) {
				let fieldValue = (e.target as HTMLInputElement).value;
				this.dataSuggestionService.getDataHouse(fieldValue);
			} else if (!this.isDataHouse && !data) {
				this.house = '';
				this.isEmptyInputHouse = true;
			}

			if (this.flat) {
				this.flat = '';
			}
			this.isDataHouse = false;

			this.dataSuggestionService.setStateSelectItem(false);
		});
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

	applyPromoCode(data:string) {
		this.promoCode = data;
	}

	goToPaymentPage() {

		let queryData = {
			"deliveryDate": (new Date(`${this.selectedDate},${this.selectedTime}`)).toISOString(),
			"address": {
				"address": this.selectedFullAddress.unrestricted_value,
				"country": this.selectedFullAddress.country || 'Россия',
				"flat": this.flat,
				"geoLat": this.geo_lat,
				"geoLon": this.geo_lon
			},
			"customerFullName": this.clientName,
			"customerPhone": this.clientPhone.replace(/\s+/g, ''),
			"recipientFullName": this.recipientName,
			"recipientPhone": this.recipientPhone.replace(/\s+/g, ''),
			"comment": this.comment,
			"isDeliveryNotifications": true,
			"isRecipient": this.isRecipient,
			"isCallAllowed": this.isCallAllowed,
			"promoCode": this.promoCode
		}

		this.apiService.createOrder(queryData).subscribe(res => {
			window.location.href = res.body.paymentUri;
		});
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

	@HostListener('window:resize', ['$event'])
	onResize(e:Event) {
		this.innerWidth = window.innerWidth;
		this.getScreenState(innerWidth);
	}

	getScreenState(innerWidth: number):void {
		if (innerWidth <= 768) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}

		if (innerWidth < 992) {
			this.isTablet = true;
		} else {
			this.isTablet = false;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);

		this.deliveryDates = this.getArrDates(this.today);
		this.getInfoProdInBasket();

		this.dataSuggestionService.getInfoStreet$.subscribe(data => {
			this.selectValueStreet(data);
		});

		this.dataSuggestionService.getInfoHouse$.subscribe(data => {
			this.selectValueHouse(data);
		});
	}
}