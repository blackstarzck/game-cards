export function getCookie(name) {
	var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
	return value ? value[2] : null;
}

export function setComma(inNum){
    let rgx2 = /(\d+)(\d{3})/; 
    let outNum;
    outNum = inNum; 
    while (rgx2.test(outNum)) {
        outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
    }
    return outNum;
}

export function setCookie(name, value, exp) {
	var date = new Date();
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}