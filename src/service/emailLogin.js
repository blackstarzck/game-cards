import { handleSessionItem } from "../util/util";

export const emailLoginCheck = () => {
    const sStorage = handleSessionItem("GET", "U_INFO");
    let name, id, email, auto, pwd;
    if(sStorage){
        const arr = sStorage.split(",");
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

export const emailLogOut = () => handleSessionItem("REMOVE", "U_INFO");