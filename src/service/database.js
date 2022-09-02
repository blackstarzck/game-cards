import { firebaseApp } from "./firebase"
import { getFirestore, collection, doc, getDoc , getDocs, setDoc } from 'firebase/firestore';
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { time } from "../util/util";

class Database {
    constructor(){
        this.db = getFirestore(firebaseApp);
        this.realtimeDB = getDatabase();
    }

    loginCheck(userId, name, email, login) {
        const emailRef = userId.indexOf("@");
        const id = (emailRef > -1) ? userId.substr(0, emailRef) : userId;

        set(ref(this.realtimeDB, `users/${id}`), {
            online: login,
            username: name,
            email: email,
        });
    }

    frdOnlineCheck(userId, updateFunc){
        const emailRef = userId.indexOf("@");
        const id = (emailRef > -1) ? userId.substr(0, emailRef) : userId;
        const onlineRef = ref(this.realtimeDB, 'users/' + id + '/online');
        console.log("step3");
        onValue(onlineRef, (snapshot) => {
            const data = snapshot.val();
            console.log("step4, [database] data: ", data, snapshot);
            data && updateFunc(data);
        });
        return () => onlineRef.off();
    }

    async getDatas(tableName){
        const docRef = collection(this.db, tableName);
        const docSnapshot = await getDocs(docRef);
        const result = docSnapshot.docs.map(doc => doc.data());
        return result;
    }

    async getSingleData(tableName, docName, func){ // docName이 공백으로 들어와서는 안된다. (경고메시지 발생)
        if(!docName){ alert("docName이 공백입니다."); return  }
        const docRef = doc(this.db, tableName, docName);
        const document = await getDoc(docRef);
        const result = document.data();
        console.log(`[get] tableName: ${tableName}, docName: ${docName}`, result);
        func && func(result);
        return result;
    }

    writeNewData(tableName, docum, input, func){
        if(!docum){ alert(`${tableName} docName이 공백입니다.`); return  }
        // console.log(`0 [write2] tableName: ${tableName}, docName: ${docum} input: `, input);

        const docName = String(docum);
        let inputData, obj;

        this.getSingleData(tableName, docName)
        .then((result) => {
            let doubleCheck = false;

            switch(tableName){
                case "ALARM_TABLE" :
                    if(result && result.data.length > 0){
                        for(let i = 0; i < result.data.length; i++){
                            if(
                                result.data[i].TRG_ID == input.id &&
                                result.data[i].TRG_NAME == input.name &&
                                result.data[i].ALARM_TYPE == input.alarm_type
                            ){
                                doubleCheck = true;
                                return;
                            }
                        }
                    }

                    inputData = result ? 
                        [ ...result.data, { KEY: input.KEY || "", ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : time(),TRG_ID : input.TRG_ID, TRG_NAME : input.TRG_NAME,TRG_UID : "", TRG_EMAIL: input.TRG_EMAIL ? input.TRG_EMAIL : "" }] :
                        [ { KEY: input.KEY || "", ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : time(),TRG_ID : input.TRG_ID, TRG_NAME : input.TRG_NAME, TRG_UID : "", TRG_EMAIL: input.TRG_EMAIL ? input.TRG_EMAIL : "" }];
                    obj = {
                        UID: "",
                        USER_ID: String(input.id),
                        USER_EMAIL: input.email || "",
                        USER_NAME: input.name,
                        data: inputData
                    }
                break;
                case "USER_LOG" :
                    inputData = result ? 
                        [ ...result.LOG, { STATUS: input.inOut, TIME_STAMP: time() } ] :
                        [ { STATUS: input.inOut, TIME_STAMP: time() } ];
                    obj = {
                        UID: "",
                        REGI_TYPE: input.regi_type,
                        USER_ID: String(input.id),
                        USER_NAME: input.name,
                        LOG: inputData
                    }
                break;
                case "USERS" :
                    obj = {
                        ACCOUNT_STATE : "Y",
                        AUTO_LOGIN : false,
                        ENTER_DATE : result?.ENTER_DATE || time(),
                        LEAVE_DATE : "",
                        REGI_TYPE : input.regi_type,
                        UID : "",
                        USER_EMAIL : input.email,
                        USER_ID : String(input.id),
                        USER_NAME : input.name,
                        USER_PW : input.pwd ? input.pwd : ""
                    }
                break;
                case "USER_CARDS" :
                    obj = input;
                break;
                case "BTL_DT" :
                    inputData = result ? 
                        [ ...result.DETAIL, input ] :
                        [ input ];
                    obj = {
                        UID: "",
                        USER_ID: String(input.id),
                        USER_EMAIL: input.email,
                        USER_NAME: input.name,
                        DETAIL: inputData
                    }
                break;
                case "USER_FRDS" :
                    inputData = result ? 
                        [ ...result.FRDS_INFO, input ] :
                        [ input ];
                    obj = {
                        UID: "",
                        USER_ID: String(input.id),
                        USER_NAME: input.name,
                        FRDS_INFO: inputData
                    };
                break;
            }
            
            console.log(`[write1] tableName: ${tableName}, docName: ${docName} input: `, input, obj);

            setDoc(doc(this.db, tableName, docName), obj).then(() => {
                func && func();
            });
        });
    }

    writeNewDataV2(tableName, docum, input, func){ // db조회가 먼저 이루어진 상황에서만 사용 가능하다.
        if(!docum){ alert("docName이 공백입니다."); return  }
        let obj;
  
        switch(tableName){
            case "USER_LOG" :
                obj = {
                    USER_ID: String(input.id),
                    USER_NAME: input.name,
                    LOG: input.log
                };
            break;
            case "USERS" :
                obj = {
                    ACCOUNT_STATE : "Y",
                    AUTO_LOGIN : false,
                    ENTER_DATE : time(),
                    LEAVE_DATE : "",
                    REGI_TYPE : input.regi_type,
                    UID : "",
                    USER_EMAIL : input.email,
                    USER_ID : String(input.id),
                    USER_NAME : input.name,
                    USER_PW : input.pwd
                };
            break;
            case "ALARM_TABLE" :
                obj = input;
            break;
            case "BTL_DT" :
                obj = input;
            break;
        }

        // console.log(`[write2] tableName: ${tableName}, docName: ${docum} input: `, input, obj);
      
        setDoc(doc(this.db, tableName, docum), obj).then(() => {
            func && func();
        });
    }
}


export default Database