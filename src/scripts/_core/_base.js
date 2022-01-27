function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function capitalizeFirstLetter(string) {
    let str = string.charAt(0).toUpperCase() + string.slice(1);
    return str.replace('_', ' ');
}
function queryAll(showItems = '', page = '', color = '', type = '', rating = '', price = '', sort = '') {
    return '?showItems=' + showItems + '&page=' + page + '&color=' + color + '&type=' + type + '&rating=' + rating + '&price=' + price + '&sort=' + sort + '';
}
function jsonLoad(path, success, error) {
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch(e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}