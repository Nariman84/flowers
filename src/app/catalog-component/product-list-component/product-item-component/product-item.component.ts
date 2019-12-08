import { Component, Input } from '@angular/core';

@Component({
	selector: '[product-item]',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

	count: number = 0;
	idBlock: string = null;

	@Input() flower;
	@Input()
	set idx(value: string) {
		if (+value > 9) {
			value = `${(+value%10) + 1}`;
		}
		this.idBlock = 'block' + value;
	}

	get idx(): string {return this.idBlock || 'block1'}

	increase(): void {
		this.count++;
	}

	decrease(): void {
		if (this.count > 0) {
			this.count--;
		}
	}

	constructor() {	}
}