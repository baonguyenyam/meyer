function ___buildcustomColors(MEYER_APP) {
	for (let key in MEYER_APP.MEYER_APP_COLOR) {
		if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_COLOR, key)) {
			$('#customColors').append('<div class="form-check" style="background:'+MEYER_APP.MEYER_APP_COLOR[key].hex_value+'"><input class="form-check-input" id="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '" type="checkbox" value="' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '"><label class="form-check-label" for="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '">' + capitalizeFirstLetter(MEYER_APP.MEYER_APP_COLOR[key].colour_name) + '</label></div>');
		}
	}
	$('#customColors').on('change', () => {
		window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), $('#customColors input:checked').map(function () { return $(this).val(); }).get().join(','), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'), getParameterByName('sort'));
	});
	if (getParameterByName('color')) {
		let m = getParameterByName('color').split(',');
		for (let key in m) {
			if (Object.hasOwnProperty.call(m, key)) {
				$('#customColors input[value="' + m[key] + '"]').prop('checked', true);
			}
		}
	}
	$('#customColors .form-check-input').each(function () {
		if ($(this).prop('checked')) {
			$(this).parent().addClass('active');
		}
	})
}