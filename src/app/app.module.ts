import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header.component';
import { NavLargeComponent } from './nav-large-component/nav-large.component';
import { BannerComponent } from './banner-component/banner.component';
import { CategoryComponent } from './category-component/category.component';
import { AdvantageComponent } from './advantage-component/advantage.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './catalog-component/product-list-component/product-item-component/product-item.component';
import { ProductListComponent } from './catalog-component/product-list-component/product-list-component';
import { AboutUsComponent } from './about-component/about.component';
import { ReviewsComponent } from './reviews-component/reviews.component';
import { ReviewItemComponent } from './reviews-component/review-item-component/review-item.component';
import { FooterComponent } from './footer-component/footer.component';
import { LowestFooterComponent } from './footer-component/lowest-footer-component/lowest-footer.component';
import { UpperFooterComponent } from './footer-component/upper-footer-component/upper-footer.component';
import { CatalogComponent } from './catalog-component/catalog.component';
import { FiltersComponent } from './catalog-component/filters-component/filters.component';
import { FilterTypesComponent } from './catalog-component/filters-component/filter-types-component/filter-type.component';
import { FilterFlowerComponent } from './catalog-component/filters-component/filter-flower-component/filter-flower.component';
import { FilterSortComponent } from './catalog-component/filters-component/filter-sort-component/filter-sort.component';
import { FilterColorsComponent } from './catalog-component/filters-component/filter-colors-component/filter-colors.component';
import { FilterOccasionComponent } from './catalog-component/filters-component/filter-occasion-component/filter-occasion.component';
import { FilterPriceComponent } from './catalog-component/filters-component/filter-price-component/filter-price.component';
import { MainSidebarComponentMobile } from './main-sidebar-component/main-sidebar.component.mobile';

import { ApiService } from './services/api.service';
import { StateFilterService } from './services/state-filter.service';
import { ChangeFilterService } from './services/change-filters.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavLargeComponent,
		BannerComponent,
		CategoryComponent,
		AdvantageComponent,
		CatalogComponent,
		FiltersComponent,
		FilterTypesComponent,
		FilterFlowerComponent,
		FilterSortComponent,
		FilterColorsComponent,
		FilterOccasionComponent,
		FilterPriceComponent,
		ProductListComponent,
		ProductItemComponent,
		AboutUsComponent,
		ReviewsComponent,
		FooterComponent,
		UpperFooterComponent,
		LowestFooterComponent,
		MainSidebarComponentMobile,
		ReviewItemComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		Ng5SliderModule
	],
	providers: [ ApiService, StateFilterService, ChangeFilterService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }