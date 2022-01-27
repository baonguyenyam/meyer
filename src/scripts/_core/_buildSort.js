function ___buildSortItem(MEYER_APP) {
	let getpage = getParameterByName('page') ? getParameterByName('page') : 1;
	let getsort = (!getParameterByName('sort') || getParameterByName('sort') === 'asc' || getParameterByName('sort') === '') ? 'desc' : 'asc';
	let icon = ''
	if(getsort === 'desc') {
		icon = '<i class="fas fa-sort-amount-down-alt"></i>';
	} else {
		icon = '<i class="fas fa-sort-amount-up-alt"></i>';
	}
	$('#sortItems').append('<a class="btn btn-light border" href="?showItems=' + getParameterByName('showItems') + '&page=' + getpage + MEYER_APP.MEYER_CURRENT_QUERY+'&sort='+getsort+'"> '+icon+'</a>');
}