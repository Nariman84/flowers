import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {  }

}
