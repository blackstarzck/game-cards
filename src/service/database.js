import { firebaseApp } from "./firebase"
import { getFirestore, collection, doc, getDoc , getDocs, setDoc } from 'firebase/firestore';

class Database {
    constructor(){ this.db = getFirestore(firebaseApp); }

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
                            if(result.data[i].TRG_ID == input.id && result.data[i].TRG_NAME == input.name){
                                doubleCheck = true;
                                break;
                            }
                        }
                    }
                    if(!doubleCheck){
                        inputData = result ? 
                            [ ...result.data, { ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : new Date(),TRG_ID : input.id, TRG_NAME : input.name,TRG_UID : "" }] :
                            [ { ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : new Date(),TRG_ID : input.id, TRG_NAME : input.name,TRG_UID : "" }];
                        obj = {
                            UID: "",
                            USER_ID: String(input.id),
                            USER_EMAIL: input.email,
                            USER_NAME: input.name,
                            data: inputData
                        }
                    }
                break;
                case "USER_LOG" :
                    inputData = result ? 
                        [ ...result.LOG, { STATUS: input.inOut, TIME_STAMP: new Date() } ] :
                        [ { STATUS: input.inOut, TIME_STAMP: new Date() } ];
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
                        ENTER_DATE : result?.ENTER_DATE || new Date(),
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
                    const { USER_ID, USER_NAME, POWER, NICK, JOB_KR, JOB_EN, LEVEL, EXP, GROUP_NO, STATS, REMAIN, CODE, DESCR, QUOTE, SELECTED, IMG_URL } = input;
                    const { AGI, DEX, INT, STR, VIT, LUCK } = input.STATS;
                    const idx = result ? (result.CARDS.length + 1) : 1;
                    const newObj = { KEY: idx, GROUP_ORDER: idx, PREF_RANK: 0, POWER, NICK, JOB_KR, JOB_EN, LEVEL, EXP, GROUP_NO, REMAIN, CODE, DESCR, QUOTE, SELECTED, IMG_URL, AGI, DEX, INT, STR, VIT, LUCK };
                    inputData = result ?  [ ...result.CARDS, newObj ] : [ newObj ];
                    obj = {
                        DAILY_CNT: 5,
                        UID: "", USER_ID, USER_NAME,
                        CARDS: inputData,
                        GROUPS: {
                            NO1 : {
                                GROUP_POWER: 0,
                                GROUP_RANK: 0,
                                MEMBERS: []
                            },
                            NO2 : {
                                GROUP_POWER: 0,
                                GROUP_RANK: 0,
                                MEMBERS: []
                            },
                            NO3 : {
                                GROUP_POWER: 0,
                                GROUP_RANK: 0,
                                MEMBERS: []
                            }
                        }
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
                    ENTER_DATE : new Date(),
                    LEAVE_DATE : "",
                    REGI_TYPE : input.regi_type,
                    UID : "",
                    USER_EMAIL : input.email,
                    USER_ID : String(input.id),
                    USER_NAME : input.name,
                    USER_PW : input.pwd
                };
            break;
        }

        // console.log(`[write2] tableName: ${tableName}, docName: ${docum} input: `, input, obj);
      
        setDoc(doc(this.db, tableName, docum), obj).then(() => {
            func && func();
        });
    }
}


export default Database