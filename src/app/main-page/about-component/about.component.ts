import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'about-us',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutUsComponent {

	constructor() { }

	public innerWidth: number;

	@Output() scrollToCatalog = new EventEmitter();

	scrollToCatalogAbout(): void {
		this.scrollToCatalog.emit();
	}
}