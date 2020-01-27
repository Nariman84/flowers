import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'password-recovery',
	templateUrl: './password-recovery.component.html',
	styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

	constructor(
		private apiService: ApiService,
		private router: Router,
		private formBuilder: FormBuilder
	) { }

	public passwordRecoveryForm: FormGroup;
	public submitted = false;
	public isBadRequest: boolean = false;
	public errorText: string;

	get passwordRecoveryFormFields() {
		return this.passwordRecoveryForm.controls;
	}

	@Output() passwordRecovery = new EventEmitter<any>();

	onSubmit() {
		this.submitted = true;

		if (this.passwordRecoveryForm.invalid) {
            return;
        }

		this.apiService.rememberPassword(this.passwordRecoveryFormFields.username.value)
			.subscribe(res => {
				this.isBadRequest = false;
				this.passwordRecovery.emit();
			}, err => {
				this.isBadRequest = true;
				this.errorText = err.error.message;
			});
	}

	onInput(e: Event) {
		let target = (e.target as HTMLInputElement).value;
		if (!target) {
			this.isBadRequest = false;
			this.submitted = false;
		}
	}

	ngOnInit() {
		this.passwordRecoveryForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
	}

}
