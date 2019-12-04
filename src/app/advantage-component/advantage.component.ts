import { Component } from '@angular/core';

@Component({
	selector: 'advantage',
	templateUrl: './advantage.component.html',
	styleUrls: ['./advantage.component.css']
})
export class AdvantageComponent {

	isActiveOne: boolean = false;
	isActiveTwo: boolean = false;
	constructor() {	}

	PopUpShowOne() {
		this.isActiveOne = !this.isActiveOne;
	}

	PopUpShowTwo() {
		this.isActiveTwo = !this.isActiveTwo;
	}

	PopUpHideOne() {
		this.isActiveOne = !this.isActiveOne;
	}

	PopUpHideTwo() {
		this.isActiveTwo = !this.isActiveTwo;
	}
}