import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  public lowPrice: number;
  public attributesIds: string;
  public eventScrollToCatalog: Subject<void> = new Subject<void>();

	getCheapFlowers(price: number):void {
		this.lowPrice = price;
  }

	getCategoryFlowers(id: string):void {
		this.attributesIds = id;
  }

  scrollToCatalog():void {
		this.eventScrollToCatalog.next();
	}

  ngOnInit() {  }

}
