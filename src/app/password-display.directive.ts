import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

const crossedEye = `assets/icons/hidden-password.svg`;
const eye = `assets/icons/visible-password.svg`;

@Directive({
	selector: '[passwordDisplay]'
})
export class PasswordDisplayDirective implements OnInit {

	constructor(
		private passwordField: ElementRef,
		private renderer: Renderer2
	) { }

	public isVisiblePassword: boolean = false;

	ngOnInit() {
		let inputField = this.passwordField.nativeElement;
		let parentInputField = inputField.parentElement;

		this.renderer.setStyle(parentInputField, 'position', 'relative');

		let toggleBtnEye = this.renderer.createElement('div');

		this.renderer.setStyle(toggleBtnEye, 'width', '18px');
		this.renderer.setStyle(toggleBtnEye, 'height', '18px');
		this.renderer.setStyle(toggleBtnEye, 'position', 'absolute');
		this.renderer.setStyle(toggleBtnEye, 'top', '50%');
		this.renderer.setStyle(toggleBtnEye, 'right', '12px');
		this.renderer.setStyle(toggleBtnEye, 'transform', 'translateY(-50%)');
		this.renderer.setStyle(toggleBtnEye, 'z-index', '5');
		this.renderer.setStyle(toggleBtnEye, 'cursor', 'pointer');
		this.renderer.setStyle(toggleBtnEye, 'background-color', 'transparent');
		this.renderer.setStyle(toggleBtnEye, 'background-repeat', 'no-repeat');
		this.renderer.setStyle(toggleBtnEye, 'background-position', '50% 50%');
		this.renderer.setStyle(toggleBtnEye, 'background-image', `url(${crossedEye})`);

		this.renderer.appendChild(parentInputField, toggleBtnEye);

		this.renderer.listen(toggleBtnEye, 'click', (event) => {
			this.isVisiblePassword = !this.isVisiblePassword;
			this.renderer.setStyle(toggleBtnEye, 'background-image', `url(${this.isVisiblePassword ? eye : crossedEye})`);

			this.renderer.setAttribute(inputField, 'type', this.isVisiblePassword ? 'text' : 'password');
		});
	}
}
