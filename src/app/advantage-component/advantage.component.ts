import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'advantage',
	templateUrl: './advantage.component.html',
	styleUrls: ['./advantage.component.css']
})
export class AdvantageComponent implements OnInit {

	public isActiveOne: boolean = false;
	public isActiveTwo: boolean = false;
	public innerWidth: number;
	public isDesktop: boolean;

	constructor() {	}

	@HostListener('window:resize', ['$event'])
	onResize(e:Event):void {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}

	PopUpShowOne():void {
		this.isActiveOne = !this.isActiveOne;
	}

	PopUpShowTwo():void {
		this.isActiveTwo = !this.isActiveTwo;
	}

	PopUpHideOne() {
		this.isActiveOne = !this.isActiveOne;
	}

	PopUpHideTwo():void {
		this.isActiveTwo = !this.isActiveTwo;
	}

	//получить состояние экрана (desktop или monitor)
	getScreenState(innerWidth:number):void {
		if (innerWidth < 769) {
			this.isDesktop = false;
		} else {
			this.isDesktop = true;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}