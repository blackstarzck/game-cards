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

export function detectGIF(cardCode){
    let array = [ "F-HP1-1", "F-HP1-2", "F-HP1-3", "F-HP1-4", "F-HP1-5", "F-HP1-6", "F-HP2-1", "F-HP2-2", "F-NU1-1", "F-NU1-2", "F-NU1-3", "M-HP1-1", "M-HP1-2", "M-HP1-3", "M-HP1-4", "M-HP1-5", "M-HP1-6", "M-HP1-7", "M-HP1-8", "M-HP1-9", "M-HP1-10", "M-HP2-1", "M-HP2-2", "M-HP2-3", "M-HP2-4", "M-HP2-5", "M-HP2-6", "M-HP2-7", "M-HP2-8", "M-HP2-9", "M-HP2-10", "M-NU2-1", "M-NU2-2", "M-NU2-3", "M-NU2-4", "M-NU2-5", "M-NU2-6" ];
    let result = "png";
    for(let i = 0; i < array.length; i++){
        if(array[i] === cardCode){
            result = "gif";
        }
    }
    return result;
}

export function handleSessionItem(type, key, val){
    const sStorage = window.sessionStorage;
    const get_item = sStorage.getItem(key) || "";
  
    if(type == "SET" && get_item == ""){
        sStorage.setItem(key, val);
    }else if(type == "GET"){
        return get_item;
    }else if(type == "CLEAR"){
        sStorage.clear();
    }else if(type == "REMOVE" && get_item != ""){
        sStorage.removeItem(key);
    }
}

export function rememberUserData(){
    const cookie = getCookie("U_INFO");
    let name, id, email, auto, pwd;
    if(cookie){
        const arr = cookie.split(",");
        let keyVal;
        for(let i = 0; i < arr.length; i++){
            keyVal = arr[i].split(":");
            for(let n = 0; n < keyVal.length; n++){
                if(keyVal[0] === "user_email") email = keyVal[1];
                if(keyVal[0] === "user_id") id = keyVal[1];
                if(keyVal[0] === "user_name") name = keyVal[1];
                if(keyVal[0] === "auto") auto = keyVal[1];
                if(keyVal[0] === "user_pwd") pwd = keyVal[1];
            }
        }
        return { name, id, email, auto, pwd };
    }else{
        return null;
    }
}

export function rememberCardData(){
    const cookie = getCookie("PREV_INFO");
    let NICK, JOB_KR, JOB_EN, LEVEL, EXP, GROUP_NO, STR, AGI, DEX, VIT, INT, LUCK, REMAIN, CODE, DESCR, QUOTE, SELECTED, IMG_URL;
    if(cookie){
        const arr = cookie.split(",");
        let keyVal;
        for(let i = 0; i < arr.length; i++){
            keyVal = arr[i].split(":");
            for(let n = 0; n < keyVal.length; n++){
                if(keyVal[0] === "NICK") NICK = keyVal[1];
                if(keyVal[0] === "JOB_KR") JOB_KR = keyVal[1];
                if(keyVal[0] === "JOB_EN") JOB_EN = keyVal[1];
                if(keyVal[0] === "LEVEL") LEVEL = Number(keyVal[1]);
                if(keyVal[0] === "EXP") EXP = Number(keyVal[1]);
                if(keyVal[0] === "GROUP_NO") GROUP_NO = Number(keyVal[1]);
                if(keyVal[0] === "STR") STR = Number(keyVal[1]);
                if(keyVal[0] === "AGI") AGI = Number(keyVal[1]);
                if(keyVal[0] === "DEX") DEX = Number(keyVal[1]);
                if(keyVal[0] === "VIT") VIT = Number(keyVal[1]);
                if(keyVal[0] === "INT") INT = Number(keyVal[1]);
                if(keyVal[0] === "LUCK") LUCK = Number(keyVal[1]);
                if(keyVal[0] === "REMAIN") REMAIN = Number(keyVal[1]);
                if(keyVal[0] === "CODE") CODE = keyVal[1];
                if(keyVal[0] === "DESCR") DESCR = keyVal[1];
                if(keyVal[0] === "QUOTE") QUOTE = keyVal[1];
                if(keyVal[0] === "SELECTED") SELECTED = Number(keyVal[1]);
                if(keyVal[0] === "IMG_URL") IMG_URL = "https:" + keyVal[1];
            }
        }
        return { STATS: { STR,  AGI,  DEX,  VIT,  INT, LUCK }, NICK, JOB_KR, JOB_EN, LEVEL, EXP, GROUP_NO, REMAIN, CODE, DESCR, QUOTE, SELECTED, IMG_URL };
    }else{
        return null;
    }
}

export function getDateFromSec(milliSecond){
    const data = new Date(milliSecond);

    const year = data.getFullYear();
    const month = data.getMonth() + 1;
    const date = data.getDate();

    console.log(`${year}.${month}.${date}`);

    return `${year}.${month}.${date}`;
}

export function time() {
    const date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const result = `${year}.${month}.${day} ${hour}:${minutes}:${seconds}`
    
    console.log(result);
    return result;
}