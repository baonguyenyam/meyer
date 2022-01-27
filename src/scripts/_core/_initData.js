// FILTER DATA BY COLOR, TYPE, RATING, PRICE... 
function ___filterData(e, MEYER_APP) {
	// ------------------------------------------------------------
	// Filter by type 
	if (getParameterByName('type')) {
		let m = getParameterByName('type').split(',');
		let AlltmpData = [];
		for (let key in m) {
			let tmpData = [];
			if (Object.hasOwnProperty.call(m, key)) {
				tmpData = e.filter(function (item) {
					return item.product_type.includes(m[key]);
				});
				AlltmpData = AlltmpData.concat(tmpData);
			}
		}
		e = AlltmpData;
	}
	// ------------------------------------------------------------
	// Filter by color 
	if (getParameterByName('color')) {
		let m = getParameterByName('color').split(',');
		let AlltmpData = [];
		for (let key in m) {
			let tmpData = [];
			if (Object.hasOwnProperty.call(m, key)) {
				tmpData = e.filter(function (activity) {
					return activity.product_colors.some(function (el) {
						return el.colour_name === m[key] + ' ' || el.colour_name === m[key];
					});
				});
				AlltmpData = AlltmpData.concat(tmpData);
			}
		}
		e = AlltmpData;
	}
	// ------------------------------------------------------------
	// Filter by price 
	if (getParameterByName('price')) {
		e = e.filter(function (el) {
			return parseInt(el.price) <= parseInt(getParameterByName('price'));
		});
	}
	// ------------------------------------------------------------
	// Filter by rating 
	if (getParameterByName('rating')) {
		e = e.filter(function (el) {
			return el.rating >= parseInt(getParameterByName('rating')) && el.rating < (parseInt(getParameterByName('rating')) + 1);
		});
	}
	// ------------------------------------------------------------
	// Filter by sort 
	if (getParameterByName('sort') && getParameterByName('sort') === 'desc') {
		e.sort(function (a, b) {
			return parseInt(b.price) - parseInt(a.price);
		});
	} else if (getParameterByName('sort') && getParameterByName('sort') === 'asc') {
		e.sort(function (a, b) {
			return parseInt(a.price) - parseInt(b.price);
		});
	}
	// ------------------------------------------------------------
	// NEW DATA 
	// ------------------------------------------------------------
	if (e.length <= 0) {
		___buildItemsEmpty()
	} else {
		$('.itemsall').text(e.length);
		console.log('Start build items');
		console.log(e)
		console.log('End build items');
		// for (const key in e) {
		// 	if (Object.hasOwnProperty.call(e, key)) {
		// 	}
		// }
	}
	// ------------------------------------------------------------
	// PAGING
	// ------------------------------------------------------------
	if (parseInt(getParameterByName('page'))) {
		$.each(e.slice(((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE), (((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE) + MEYER_APP.MEYER_DEFAULT_PAGE)), (i, item) => {
			___buildItems(item);
		});
	} else {
		$.each(e.slice(0, MEYER_APP.MEYER_DEFAULT_PAGE), (i, item) => {
			___buildItems(item);
		});
	}
	MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, e.length);
	$('.loading').hide();

}