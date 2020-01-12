import { Component, OnInit } from '@angular/core';
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
	public isValidConfirmPass: boolean;

	get registerFormFileds() {
		return this.registerForm.controls;
	}

	onSubmit() {

		if (this.registerForm.invalid) {
			return;
		}

		this.apiService.registration(
			this.registerFormFileds.username.value,
			this.registerFormFileds.telephone.value,
			this.registerFormFileds.email.value,
			this.registerFormFileds.password.value)
				.subscribe(
					data => {
						this.apiService.setStatusAuth(true);
						this.router.navigateByUrl('profile');
					}
				);
	}

	onChangedAgree() {

	}

	goToAgreement() {
		this.modalService.dismissAll();
		this.router.navigateByUrl('agreement');
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			telephone: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
}
