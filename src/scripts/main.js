// APP
var MEYER_APP = {
	// REST FULL API 
	MEYER_REST_API: './data/data.json',
	// MEYER_REST_API: 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
	MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 6,
	MEYER_CURRENT_QUERY: '&color=' + getParameterByName('color') + '&type=' + getParameterByName('type') + '&rating=' + getParameterByName('rating') + '&price=' + getParameterByName('price'),
	MEYER_APP_PAGE: [9, 12, 15],
	MEYER_APP_PRICE_RANGE: [0,20],
	MEYER_APP_TYPE: ['bronzer', 'blush', 'lip_liner', 'foundation', 'eyeshadow', 'eyeliner', 'nail_polish', 'lipstick', 'mascara'],
	MEYER_APP_COLOR: [{hex_value: '#D39D7B', colour_name: 'Caramel'},{hex_value: '#F5CAB9', colour_name: 'Classic Ivory'},{hex_value: '#B37560', colour_name: 'Coconut'},{hex_value: '#F3BEAC', colour_name: 'Creamy Natural '},{hex_value: '#E4A890', colour_name: 'Honey Beige '},{hex_value: '#F6D2BC', colour_name: 'Ivory'},{hex_value: '#E2B598', colour_name: 'Natural Beige'},{hex_value: '#515552', colour_name: 'Audacious Asphalt '},{hex_value: '#D8BFAC', colour_name: 'Barely Beige '},{hex_value: '#B89A89', colour_name: 'Bronze Truffle '},{hex_value: '#706A70', colour_name: 'Charcoal Chrome '},{hex_value: '#5C3B27', colour_name: 'Creamy Chocolate '},{hex_value: '#DDBA89', colour_name: 'Gold Rush '},{hex_value: '#8E8C86', colour_name: 'Grey Crystal '},{hex_value: '#7D6F7D', colour_name: 'Lavish Lavender '},{hex_value: '#957B83', colour_name: 'Lilac Lust '},{hex_value: '#E5AEB9', colour_name: 'Pink Parfait '},{hex_value: '#F1BEAB', colour_name: 'Nude '},{hex_value: '#F8E0D4', colour_name: 'Porcelain Ivory'},{hex_value: '#EEBAA4', colour_name: 'Pure Beige'},{hex_value: '#EFC2A1', colour_name: 'Sandy Beige '}],
	buildShowItem: () => {
		___buildShowItem(MEYER_APP);
	},
	buildcustomPrice: () => {
		___buildcustomPrice(MEYER_APP);
	},
	buildcustomRating: () => {
		___buildcustomRating();
	},
	buildcustomType: () => {
		___buildcustomType(MEYER_APP);
	},
	buildcustomColors: () => {
		___buildcustomColors(MEYER_APP);
	},
	buildPaging: (e, i) => {
		___buildPaging(e, i, MEYER_APP);
	},
	filterData: (e) => {
		___filterData(e, MEYER_APP);
	},
	buildSort: () => {
		___buildSortItem(MEYER_APP);
	},
	buildItems: (e) => {
		___buildItems(e);
	},
	// Init App
	init: () => {
		jsonLoad(MEYER_APP.MEYER_REST_API,
			(data) => {
				MEYER_APP.buildShowItem();
				MEYER_APP.buildcustomPrice();
				MEYER_APP.buildcustomType();
				MEYER_APP.buildcustomRating();
				MEYER_APP.buildcustomColors();
				MEYER_APP.buildSort();
				MEYER_APP.filterData(data);
			},
			(xhr) => {
				console.error(xhr);
			}
		);
	},
}

jQuery(() => {
	MEYER_APP.init();
});
