"use strict";

function getParameterByName(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function capitalizeFirstLetter(string) {
  var str = string.charAt(0).toUpperCase() + string.slice(1);
  return str.replace('_', ' ');
}

function queryAll() {
  var showItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var rating = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var price = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var sort = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
  return '?showItems=' + showItems + '&page=' + page + '&color=' + color + '&type=' + type + '&rating=' + rating + '&price=' + price + '&sort=' + sort + '';
}

function jsonLoad(path, success, error) {
  var xhr = null;

  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };

  xhr.open("GET", path, true);
  xhr.send();
}

function ___buildcustomColors(MEYER_APP) {
  for (var key in MEYER_APP.MEYER_APP_COLOR) {
    if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_COLOR, key)) {
      $('#customColors').append('<div class="form-check" style="background:' + MEYER_APP.MEYER_APP_COLOR[key].hex_value + '"><input class="form-check-input" id="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '" type="checkbox" value="' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '"><label class="form-check-label" for="inlineCheckbox_' + MEYER_APP.MEYER_APP_COLOR[key].colour_name + '">' + capitalizeFirstLetter(MEYER_APP.MEYER_APP_COLOR[key].colour_name) + '</label></div>');
    }
  }

  $('#customColors').on('change', function () {
    window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), $('#customColors input:checked').map(function () {
      return $(this).val();
    }).get().join(','), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'), getParameterByName('sort'));
  });

  if (getParameterByName('color')) {
    var m = getParameterByName('color').split(',');

    for (var _key in m) {
      if (Object.hasOwnProperty.call(m, _key)) {
        $('#customColors input[value="' + m[_key] + '"]').prop('checked', true);
      }
    }
  }

  $('#customColors .form-check-input').each(function () {
    if ($(this).prop('checked')) {
      $(this).parent().addClass('active');
    }
  });
}

function ___buildItems(e) {
  var rating = Math.floor(e.rating);
  var array_stars = '';
  var em = '';
  var dm = '';

  if (rating > 0) {
    for (var index = 0; index < rating; index++) {
      dm += '<i class="fas fa-star"></i>';
    }

    if (rating < 5) {
      for (var gindex = 0; gindex < 5 - rating; gindex++) {
        em += '<i class="far fa-star deactive"></i>';
      }
    }

    array_stars = dm + em + ' <span class="text-muted">(' + e.rating + '/5)</span>';
  } else {
    for (var _gindex = 0; _gindex < 5; _gindex++) {
      em += '<i class="far fa-star deactive"></i>';
    }

    array_stars = em;
  }

  $('#items').append('<div class="col-sm-6 col-md-4 item" id="item-' + e.id + '"> <div class="product-item"><img src="' + e.api_featured_image + '"> <h5 class="my-2">' + e.name + '</h5> <p class="rating" data-rating="' + e.rating + '">' + array_stars + '</p> <p class="brand">' + e.brand + '</p> <p class="price">$' + e.price + '</p> <p class="more"> <a class="btn btn-sm" href="javascript:void(0);" data-toggle="modal" data-target="#staticBackdrop" data-id="' + e.id + '">View More</a></p> </div> </div>');
  $('[data-id="' + e.id + '"]').on('click', function () {
    var array_colors = '';

    for (var key in e.product_colors) {
      if (Object.hasOwnProperty.call(e.product_colors, key)) {
        array_colors += '<li class="list-inline-item" style="background:' + e.product_colors[key].hex_value + '">&nbsp;</li>';
      }
    }

    $('#staticBackdrop .modal-title').text(e.name);
    $('#staticBackdrop .modal-body').html('<div class="row item"> <div class="col-lg-4"><img class="w-100" src="' + e.api_featured_image + '"></div> <div class="col-lg-8"> <div class="product-item"> <h3>' + e.name + '</h3> <p class="price mb-1">$' + e.price + '</p> <p class="rating"  data-rating="' + e.rating + '">' + array_stars + '</p> <ul class="colors list-inline">' + array_colors + '</ul> <p class="desc">' + e.description + '</p> <p class="more"><a class="btn btn-primary" href="' + e.product_link + '" target="_blank">View More &nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a></p> </div> </div> </div>');
  });
}

function ___buildItemsEmpty(e) {
  $('#items').append('<div class="col-sm-12"><div class="alert alert-danger mb-4"><h4 class="alert-heading">Not found!</h4> <p>No items found in store</p></div></div>');
}

function ___buildPaging(e, i, MEYER_APP) {
  var totalPages = Math.floor(i / e) > 0 ? Math.floor(i / e) : 1;

  for (var index = 0; index < totalPages; index++) {
    if (parseInt(getParameterByName('page')) == index + 1 || isNaN(parseInt(getParameterByName('page'))) && index == 0) {
      $('#paging').append('<li class="page-item active"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '&sort=' + getParameterByName('sort') + '">' + (index + 1) + '</a></li>');
    } else {
      $('#paging').append('<li class="page-item"><a class="page-link" href="?showItems=' + e + '&page=' + (index + 1) + MEYER_APP.MEYER_CURRENT_QUERY + '&sort=' + getParameterByName('sort') + '">' + (index + 1) + '</a></li>');
    }
  }
}

function ___buildcustomPrice(MEYER_APP) {
  $('#customPrice').attr('min', MEYER_APP.MEYER_APP_PRICE_RANGE[0]).attr('max', MEYER_APP.MEYER_APP_PRICE_RANGE[1]);
  $('#customPrice').on('change', function () {
    window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), $('#customPrice').val(), getParameterByName('sort'));
  });

  if (getParameterByName('price')) {
    $('#customPrice').val(getParameterByName('price'));
  } else {
    $('#customPrice').val(MEYER_APP.MEYER_APP_PRICE_RANGE[1]);
  }

  $('#customPrice').removeClass('d-none');
}

function ___buildcustomRating() {
  var arrayRating = 5;

  for (var index = 0; index < arrayRating; index++) {
    var rank = '';

    for (var u = 0; u < arrayRating - index; u++) {
      rank += '<i class="fas fa-star text-warning"></i>';
    }

    $('#customRating').append('<div class="form-check"><input class="form-check-input" id="inlineRadiobox_' + (arrayRating - index) + '" type="radio" value="' + (arrayRating - index) + '" name="inlineRadioOptions" ><label class="form-check-label" for="inlineRadiobox_' + (arrayRating - index) + '">' + rank + '</label></div>');
  }

  $('#customRating').on('change', function () {
    window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), getParameterByName('type'), $('#customRating input:checked').val(), getParameterByName('price'), getParameterByName('sort'));
  });

  if (getParameterByName('rating')) {
    $('#customRating input[value="' + getParameterByName('rating') + '"]').prop('checked', true);
  }
}

function ___buildShowItem(MEYER_APP) {
  for (var key in MEYER_APP.MEYER_APP_PAGE) {
    if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_PAGE, key)) {
      $('#showItems').append('<option value="' + MEYER_APP.MEYER_APP_PAGE[key] + '">' + MEYER_APP.MEYER_APP_PAGE[key] + '</option>');
    }
  }

  $('#showItems').on('change', function () {
    window.location.href = queryAll(parseInt($('#showItems').val()), 1, getParameterByName('color'), getParameterByName('type'), getParameterByName('rating'), getParameterByName('price'), getParameterByName('sort'));
  });

  if (getParameterByName('showItems')) {
    $('#showItems option[value="' + getParameterByName('showItems') + '"]').prop('selected', true);
  }
}

function ___buildSortItem(MEYER_APP) {
  var getpage = getParameterByName('page') ? getParameterByName('page') : 1;
  var getsort = !getParameterByName('sort') || getParameterByName('sort') === 'asc' || getParameterByName('sort') === '' ? 'desc' : 'asc';
  var icon = '';

  if (getsort === 'desc') {
    icon = '<i class="fas fa-sort-amount-down-alt"></i>';
  } else {
    icon = '<i class="fas fa-sort-amount-up-alt"></i>';
  }

  $('#sortItems').append('<a class="btn btn-light border" href="?showItems=' + getParameterByName('showItems') + '&page=' + getpage + MEYER_APP.MEYER_CURRENT_QUERY + '&sort=' + getsort + '"> ' + icon + '</a>');
}

function ___buildcustomType(MEYER_APP) {
  for (var key in MEYER_APP.MEYER_APP_TYPE) {
    if (Object.hasOwnProperty.call(MEYER_APP.MEYER_APP_TYPE, key)) {
      $('#customType').append('<div class="form-check"><input class="form-check-input" id="inlineCheckbox_' + MEYER_APP.MEYER_APP_TYPE[key] + '" type="checkbox" value="' + MEYER_APP.MEYER_APP_TYPE[key] + '"><label class="form-check-label" for="inlineCheckbox_' + MEYER_APP.MEYER_APP_TYPE[key] + '">' + capitalizeFirstLetter(MEYER_APP.MEYER_APP_TYPE[key]) + '</label></div>');
    }
  }

  $('#customType').on('change', function () {
    window.location.href = queryAll(getParameterByName('showItems'), getParameterByName('page'), getParameterByName('color'), $('#customType input:checked').map(function () {
      return $(this).val();
    }).get().join(','), getParameterByName('rating'), getParameterByName('price'), getParameterByName('sort'));
  });

  if (getParameterByName('type')) {
    var m = getParameterByName('type').split(',');

    for (var _key2 in m) {
      if (Object.hasOwnProperty.call(m, _key2)) {
        $('#customType input[value="' + m[_key2] + '"]').prop('checked', true);
      }
    }
  }
} // FILTER DATA BY COLOR, TYPE, RATING, PRICE... 


function ___filterData(e, MEYER_APP) {
  // ------------------------------------------------------------
  // Filter by type 
  if (getParameterByName('type')) {
    (function () {
      var m = getParameterByName('type').split(',');
      var AlltmpData = [];

      var _loop = function _loop(key) {
        var tmpData = [];

        if (Object.hasOwnProperty.call(m, key)) {
          tmpData = e.filter(function (item) {
            return item.product_type.includes(m[key]);
          });
          AlltmpData = AlltmpData.concat(tmpData);
        }
      };

      for (var key in m) {
        _loop(key);
      }

      e = AlltmpData;
    })();
  } // ------------------------------------------------------------
  // Filter by color 


  if (getParameterByName('color')) {
    (function () {
      var m = getParameterByName('color').split(',');
      var AlltmpData = [];

      var _loop2 = function _loop2(key) {
        var tmpData = [];

        if (Object.hasOwnProperty.call(m, key)) {
          tmpData = e.filter(function (activity) {
            return activity.product_colors.some(function (el) {
              return el.colour_name === m[key] + ' ' || el.colour_name === m[key];
            });
          });
          AlltmpData = AlltmpData.concat(tmpData);
        }
      };

      for (var key in m) {
        _loop2(key);
      }

      e = AlltmpData;
    })();
  } // ------------------------------------------------------------
  // Filter by price 


  if (getParameterByName('price')) {
    e = e.filter(function (el) {
      return parseInt(el.price) <= parseInt(getParameterByName('price'));
    });
  } // ------------------------------------------------------------
  // Filter by rating 


  if (getParameterByName('rating')) {
    e = e.filter(function (el) {
      return el.rating >= parseInt(getParameterByName('rating')) && el.rating < parseInt(getParameterByName('rating')) + 1;
    });
  } // ------------------------------------------------------------
  // Filter by sort 


  if (getParameterByName('sort') && getParameterByName('sort') === 'desc') {
    e.sort(function (a, b) {
      return parseInt(b.price) - parseInt(a.price);
    });
  } else if (getParameterByName('sort') && getParameterByName('sort') === 'asc') {
    e.sort(function (a, b) {
      return parseInt(a.price) - parseInt(b.price);
    });
  } // ------------------------------------------------------------
  // NEW DATA 
  // ------------------------------------------------------------


  if (e.length <= 0) {
    ___buildItemsEmpty();
  } else {
    $('.itemsall').text(e.length);
    console.log('Start build items');
    console.log(e);
    console.log('End build items'); // for (const key in e) {
    // 	if (Object.hasOwnProperty.call(e, key)) {
    // 	}
    // }
  } // ------------------------------------------------------------
  // PAGING
  // ------------------------------------------------------------


  if (parseInt(getParameterByName('page'))) {
    $.each(e.slice((parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE, (parseInt(getParameterByName('page')) - 1) * MEYER_APP.MEYER_DEFAULT_PAGE + MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
      ___buildItems(item);
    });
  } else {
    $.each(e.slice(0, MEYER_APP.MEYER_DEFAULT_PAGE), function (i, item) {
      ___buildItems(item);
    });
  }

  MEYER_APP.buildPaging(MEYER_APP.MEYER_DEFAULT_PAGE, e.length);
  $('.loading').hide();

  if (getParameterByName('color') || getParameterByName('type') || getParameterByName('price') || getParameterByName('rating') || getParameterByName('sort') || getParameterByName('showItems') || getParameterByName('page')) {
    $('.filter_by').removeClass('d-none');
  }
} // APP
// ------------------------------------------------------------
// Copyright (c) 2022 Nguyen Pham. All rights reserved.
// ------------------------------------------------------------


var MEYER_APP = {
  // REST FULL API 
  // ------------------------------------------------------------
  // MEYER_REST_API: './data/data.json',
  MEYER_REST_API: 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',
  // ------------------------------------------------------------
  // MOCK-UP API SETTING
  MEYER_DEFAULT_PAGE: parseInt(getParameterByName('showItems')) ? parseInt(getParameterByName('showItems')) : 6,
  MEYER_CURRENT_QUERY: '&color=' + getParameterByName('color') + '&type=' + getParameterByName('type') + '&rating=' + getParameterByName('rating') + '&price=' + getParameterByName('price'),
  MEYER_APP_PAGE: [9, 12, 15],
  MEYER_APP_PRICE_RANGE: [0, 20],
  MEYER_APP_TYPE: ['bronzer', 'blush', 'lip_liner', 'foundation', 'eyeshadow', 'eyeliner', 'nail_polish', 'lipstick', 'mascara'],
  MEYER_APP_COLOR: [{
    hex_value: '#D39D7B',
    colour_name: 'Caramel'
  }, {
    hex_value: '#F5CAB9',
    colour_name: 'Classic Ivory'
  }, {
    hex_value: '#B37560',
    colour_name: 'Coconut'
  }, {
    hex_value: '#F3BEAC',
    colour_name: 'Creamy Natural '
  }, {
    hex_value: '#E4A890',
    colour_name: 'Honey Beige '
  }, {
    hex_value: '#F6D2BC',
    colour_name: 'Ivory'
  }, {
    hex_value: '#E2B598',
    colour_name: 'Natural Beige'
  }, {
    hex_value: '#515552',
    colour_name: 'Audacious Asphalt '
  }, {
    hex_value: '#D8BFAC',
    colour_name: 'Barely Beige '
  }, {
    hex_value: '#B89A89',
    colour_name: 'Bronze Truffle '
  }, {
    hex_value: '#706A70',
    colour_name: 'Charcoal Chrome '
  }, {
    hex_value: '#5C3B27',
    colour_name: 'Creamy Chocolate '
  }, {
    hex_value: '#DDBA89',
    colour_name: 'Gold Rush '
  }, {
    hex_value: '#8E8C86',
    colour_name: 'Grey Crystal '
  }, {
    hex_value: '#7D6F7D',
    colour_name: 'Lavish Lavender '
  }, {
    hex_value: '#957B83',
    colour_name: 'Lilac Lust '
  }, {
    hex_value: '#E5AEB9',
    colour_name: 'Pink Parfait '
  }, {
    hex_value: '#F1BEAB',
    colour_name: 'Nude '
  }, {
    hex_value: '#F8E0D4',
    colour_name: 'Porcelain Ivory'
  }, {
    hex_value: '#EEBAA4',
    colour_name: 'Pure Beige'
  }, {
    hex_value: '#EFC2A1',
    colour_name: 'Sandy Beige '
  }],
  // MOCK-UP API SETTING
  // ------------------------------------------------------------
  buildShowItem: function buildShowItem() {
    ___buildShowItem(MEYER_APP);
  },
  buildcustomPrice: function buildcustomPrice() {
    ___buildcustomPrice(MEYER_APP);
  },
  buildcustomRating: function buildcustomRating() {
    ___buildcustomRating();
  },
  buildcustomType: function buildcustomType() {
    ___buildcustomType(MEYER_APP);
  },
  buildcustomColors: function buildcustomColors() {
    ___buildcustomColors(MEYER_APP);
  },
  buildPaging: function buildPaging(e, i) {
    ___buildPaging(e, i, MEYER_APP);
  },
  filterData: function filterData(e) {
    ___filterData(e, MEYER_APP);
  },
  buildSort: function buildSort() {
    ___buildSortItem(MEYER_APP);
  },
  buildItems: function buildItems(e) {
    ___buildItems(e);
  },
  // Init App
  init: function init() {
    jsonLoad(MEYER_APP.MEYER_REST_API, function (data) {
      MEYER_APP.buildShowItem();
      MEYER_APP.buildcustomPrice();
      MEYER_APP.buildcustomType();
      MEYER_APP.buildcustomRating();
      MEYER_APP.buildcustomColors();
      MEYER_APP.buildSort();
      MEYER_APP.filterData(data);
    }, function (xhr) {
      console.error(xhr);
    });
  }
}; // on jQuery Ready 

jQuery(function () {
  MEYER_APP.init();
});
//# sourceMappingURL=main.js.map
