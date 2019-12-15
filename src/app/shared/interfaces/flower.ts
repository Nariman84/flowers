export interface Flower {

	"productId": number,
	"outsideId": string,
	"name": string,
	"price": number,
	"isDiscount": boolean,
	"isFastDelivery": boolean,
	"pieces": number,
	"pack": string,
	"note": string,
	"ratingCount1": number,
	"ratingCount2": number,
	"ratingCount3": number,
	"ratingCount4": number,
	"ratingCount5": number,
	"rating": number,
	"isHitMark": boolean,
	"inFavorites": boolean,
	"inBasket": number,
	"photos": [
		{
			"id": number,
			"fileName130": string,
			"fileName640": string,
			"fileName860": string,
			"fileName1280": string,
			"fileName2560": string,
			"originalFileName": string,
			"originalWidth": number,
			"originalHeight": number
		}
	]
}