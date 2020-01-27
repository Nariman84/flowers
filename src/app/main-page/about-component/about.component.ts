import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainSidebarService } from 'src/app/services/main-sidebar.service';

@Component({
	selector: 'about-us',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutUsComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private mainSidebarService: MainSidebarService
	) { }

	public innerWidth: number;
	private fragment: string;

	@Output() scrollToCatalog = new EventEmitter();

	scrollToCatalogAbout(): void {
		this.scrollToCatalog.emit();
	}

	ngOnInit() {
		this.innerWidth = window.innerWidth;

		this.activatedRoute.fragment.subscribe(fragment => {
			if (fragment === 'about_us') {
				setTimeout(() => {
					this.mainSidebarService.scrollToAboutUs();
				}, 500);
			};
		});
	}
}