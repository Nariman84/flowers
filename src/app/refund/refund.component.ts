import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'refund',
	templateUrl: './refund.component.html',
	styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

	constructor() { }

	public smallBanner: string = 'assets/img/refund/Banner_refund_small.svg';
	public largeBanner: string = 'assets/img/refund/Banner_refund.svg';
	public bannerTitle: string = 'Возврат';
	private innerWidth: number;
	public isDesktop: boolean;
	public isBreakInstructionTitle: boolean = true;

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
			this.isBreakInstructionTitle = false;
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
