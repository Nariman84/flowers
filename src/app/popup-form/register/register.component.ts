import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private router: Router,
		private formBuilder: FormBuilder,
		private modalService: NgbModal
	) { }

	public registerForm: FormGroup;
	public isAgree: boolean;
	public submitted = false;

	@Output() register = new EventEmitter<any>();

	get registerFormFields() {
		return this.registerForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.apiService.registration(
			this.registerFormFields.username.value,
			this.registerFormFields.telephone.value,
			this.registerFormFields.email.value,
			this.registerFormFields.password.value,
			this.registerFormFields.confirmPassword.value)
				.subscribe(
					data => {
						this.register.emit(data);
						this.apiService.setStatusAuth(true);
						this.router.navigateByUrl('profile');
					}
				);
	}

	password(formGroup: FormGroup) {
		const password = formGroup.controls['password'];
		const confirmPassword = formGroup.controls['confirmPassword'];

		if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
			return;
		}

		if (password.value !== confirmPassword.value) {
			confirmPassword.setErrors({mustMatch: true});
		} else {
			confirmPassword.setErrors(null);
		}
	}

	onChangedAgreement(e: Event) {
		this.isAgree = (e.target as HTMLInputElement).checked;
	}

	goToAgreement() {
		this.modalService.dismissAll();
		this.router.navigateByUrl('agreement');
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			telephone: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required]
		}, {
			validators: this.password.bind(this)
		});
	}
}
