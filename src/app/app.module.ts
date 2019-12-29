import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { OwlModule } from 'ngx-owl-carousel';/////////////////////////////////

import { ApiService } from './services/api.service';
import { StateFilterService } from './services/state-filter.service';
import { ChangeFilterService } from './services/change-filters.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header-component/header.component';
import { NavLargeComponent } from './nav-large-component/nav-large.component';
import { BannerComponent } from './banner-component/banner.component';
import { CategoryComponent } from './main-page/category-component/category.component';
import { AdvantageComponent } from './main-page/advantage-component/advantage.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './main-page/catalog-component/product-list-component/product-item-component/product-item.component';
import { ProductListComponent } from './main-page/catalog-component/product-list-component/product-list-component';
import { AboutUsComponent } from './main-page/about-component/about.component';
import { ReviewsComponent } from './main-page/reviews-component/reviews.component';
import { ReviewItemComponent } from './main-page/reviews-component/review-item-component/review-item.component';
import { FooterComponent } from './footer-component/footer.component';
import { LowestFooterComponent } from './footer-component/lowest-footer-component/lowest-footer.component';
import { UpperFooterComponent } from './footer-component/upper-footer-component/upper-footer.component';
import { CatalogComponent } from './main-page/catalog-component/catalog.component';
import { FiltersComponent } from './main-page/catalog-component/filters-component/filters.component';
import { FilterTypesComponent } from './main-page/catalog-component/filters-component/filter-types-component/filter-type.component';
import { FilterFlowerComponent } from './main-page/catalog-component/filters-component/filter-flower-component/filter-flower.component';
import { FilterSortComponent } from './main-page/catalog-component/filters-component/filter-sort-component/filter-sort.component';
import { FilterColorsComponent } from './main-page/catalog-component/filters-component/filter-colors-component/filter-colors.component';
import { FilterOccasionComponent } from './main-page/catalog-component/filters-component/filter-occasion-component/filter-occasion.component';
import { FilterPriceComponent } from './main-page/catalog-component/filters-component/filter-price-component/filter-price.component';
import { MainSidebarComponentMobile } from './main-sidebar-component/main-sidebar.component.mobile';

import { CardPageComponent } from './card-page/card-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { BuyerInfoPageComponent } from './buyer-info-page/buyer-info-page.component';
import { PartnerInfoPageComponent } from './partner-info-page/partner-info-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { RecentlyProductComponent } from './card-page/recently-product/recently-product.component';
import { RecentlyProductItemComponent } from './card-page/recently-product/recently-product-item/recently-product-item.component';
import { SimilarProductComponent } from './card-page/similar-product/similar-product.component';
import { SimilarProductItemComponent } from './card-page/similar-product/similar-product-item/similar-product-item.component';

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
		ReviewItemComponent,

		CardPageComponent,
		MainPageComponent,
		CatalogPageComponent,
		BuyerInfoPageComponent,
		PartnerInfoPageComponent,
		HelpPageComponent,
		RecentlyProductComponent,
		RecentlyProductItemComponent,
		SimilarProductComponent,
		SimilarProductItemComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		Ng5SliderModule,
		AppRoutingModule,
		OwlModule//////////////////////////////////////
	],
	providers: [ ApiService, StateFilterService, ChangeFilterService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }