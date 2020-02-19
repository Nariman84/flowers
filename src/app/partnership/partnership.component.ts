import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'partnership',
	templateUrl: './partnership.component.html',
	styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private authService: AuthService
	) { }

	public smallBanner: string = 'assets/img/partnership/Banner_partnership_small.svg';
	public largeBanner: string = 'assets/img/partnership/Banner_partnership.svg';
	public bannerTitle: string = 'Сотрудничество';
	public innerWidth: number;
	public isDesktop: boolean;

	public instructionWork = [
		{
			icon: 'assets/icons/partnership/step-1.svg',
			text: 'На главной странице нажать на иконку пользователя в правом верхнем углу',
			example: 'assets/img/partnership/example_step-1.png'
		},
		{
			icon: 'assets/icons/partnership/step-2.svg',
			text: 'В открывшемся окне необходимо нажать кнопку “Регистрация” и полностью пройти ее',
			example: 'assets/img/partnership/example_step-2.png'
		},
		{
			icon: 'assets/icons/partnership/step-3.svg',
			text: 'Напишите нам на электронную почту <a class="partnership_email" href="mailto:info@jbandflowers.ru">info@jbandflowers.ru</a> свои Имя и Email, указанные при регистрации, тема письма “Регистрация магазина”.',
			example: 'assets/img/partnership/example_step-3.png'
		},
		{
			icon: 'assets/icons/partnership/step-4.svg',
			text: 'Проверка может занять 1-2 рабочих дня. Мы сообщим вам о том, что ваш аккаунт переведен в статус магазина. В таком случае в личном кабинете вы увидите кнопку ”Админ. Панель".',
			example: 'assets/img/partnership/example_step-4.png'
		},
		{
			icon: 'assets/icons/partnership/step-5.svg',
			text: 'Все готово! В Административной панели магазина вы можете создавать и редактировать карточки товаров, управлять заказами, а также видеть свои финансы и статистику.',
			example: 'assets/img/partnership/example_step-5.png'
		}
	];

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
	}

	openRegistationForm() {
		if (!this.authService.isUserAuth) {
			this.modalService.open(PopupFormComponent);
		}
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;
		this.getScreenState(this.innerWidth);
	}
}
