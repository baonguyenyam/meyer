function ___buildcustomRating() {
	let arrayRating = 5;
	for (let index = 0; index < arrayRating; index++) {
		let rank = ''
		for (let u = 0; u < arrayRating-index; u++) {
			rank += '<i class="fas fa-star text-warning"></i>';
		}
		$('#customRating').append('<div class="form-check"><input class="form-check-input" id="inlineRadiobox_' + (arrayRating-index) + '" type="radio" value="' + (arrayRating-index) + '" name="inlineRadioOptions" ><label class="form-check-label" for="inlineRadiobox_' + (arrayRating-index) + '">' + rank +
			'</label></div>');
	}
	$('#customRating').on('change', () => {
		window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), $('#customRating input:checked').val(), getParameterByName('price'), getParameterByName('sort'));
	});
	if (getParameterByName('rating')) {
		$('#customRating input[value="' + getParameterByName('rating') + '"]').prop('checked', true);
	}
}