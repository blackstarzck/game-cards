import { firebaseApp } from "./firebase"
import { getFirestore, collection, doc, getDoc , getDocs, setDoc } from 'firebase/firestore';
import { getDatabase, onValue, ref, set, push, onChildAdded } from "firebase/database";
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
            email: email
        });
    }

    frdOnlineCheck(userId, updateFunc){
        const emailRef = userId.indexOf("@");
        const id = (emailRef > -1) ? userId.substr(0, emailRef) : userId;
        const onlineRef = ref(this.realtimeDB, 'users/' + id + '/online');
        onValue(onlineRef, (snapshot) => {
            const data = snapshot.val();
            updateFunc(data);
        })
    }

    messageSend(data){
        const emailRef = data.id.indexOf("@");
        const id = (emailRef > -1) ? data.id.substr(0, emailRef) : data.id;
        const postListRef = ref(this.realtimeDB, `/messages/${data.key}`);
        const newMessage = push(postListRef);
        set(newMessage, { sender: id, msg: data.msg, time: time() });
    }

    messageLogInit(key, updateFunc){
        const dbRef = ref(this.realtimeDB, `/messages/${key}`);
        onValue(dbRef, (log) => {
            updateFunc(log);
        }, {
            onlyOnce: true
        });
    }

    messageAddCheck(key, updateFunc){
        const dbRef = ref(this.realtimeDB, `/messages/${key}`);
        onChildAdded(dbRef, (newMsg) => {
            updateFunc(newMsg.val());
        });
    }

    newMessageCheck(key, updateFunc){
        const dbRef = ref(this.realtimeDB, `/messages/${key}`);
        onChildAdded(dbRef, (newMsg) => {
            updateFunc(newMsg.val());
        });
    }

    async getDatas(tableName){
        const docRef = collection(this.db, tableName);
        const docSnapshot = await getDocs(docRef);
        const result = docSnapshot.docs.map(doc => doc.data());
        return result;
    }

    async getSingleData(tableName, docName, func){ // docName??? ???????????? ??????????????? ?????????. (??????????????? ??????)
        if(!docName){ alert("docName??? ???????????????."); return  }
        const docRef = doc(this.db, tableName, docName);
        const document = await getDoc(docRef);
        const result = document.data();
        // console.log(`[get] tableName: ${tableName}, docName: ${docName}`, result);
        func && func(result);
        return result;
    }

    writeNewData(tableName, docum, input, func){
        if(!docum){ alert(`${tableName} docName??? ???????????????.`); return  }
        // console.log(`0 [write2] tableName: ${tableName}, docName: ${docum} input: `, input);

        const docName = String(docum);
        let inputData, obj;

        this.getSingleData(tableName, docName)
        .then((result) => {
            switch(tableName){
                case "ALARM_TABLE" :
                    inputData = result ? 
                        [ ...result.data, { KEY: input.KEY || "", ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : time(),TRG_ID : input.TRG_ID, TRG_NAME : input.TRG_NAME, TRG_UID : "", TRG_EMAIL: input.TRG_EMAIL || "", MSG: input.MSG || "", BET_DESCR: input.BET_DESCR ||"" }] :
                        [ { KEY: input.KEY || "", ALARM_TYPE : input.alarm_type, READ_STATE : "N",RESULT : "N",TIME_STAMP : time(),TRG_ID : input.TRG_ID, TRG_NAME : input.TRG_NAME, TRG_UID : "", TRG_EMAIL: input.TRG_EMAIL || "", MSG: input.MSG || "", BET_DESCR: input.BET_DESCR ||"" }];
                    obj = {
                        UID: "",
                        USER_ID: String(input.id),
                        USER_EMAIL: input.email || "",
                        USER_NAME: input.name,
                        data: inputData
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
                        USER_EMAIL: input.email || "",
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
                default :
            }
            
            // console.log(`[write1] tableName: ${tableName}, docName: ${docName} input: `, input, obj);

            setDoc(doc(this.db, tableName, docName), obj).then(() => {
                func && func();
            });
        });
    }

    writeNewDataV2(tableName, docum, input, func){ // db????????? ?????? ???????????? ??????????????? ?????? ????????????.
        if(!docum){ alert("docName??? ???????????????."); return  }
        let obj;
  
        switch(tableName){
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
            default :
        }

        // console.log(`[write2] tableName: ${tableName}, docName: ${docum} input: `, input, obj);
      
        setDoc(doc(this.db, tableName, docum), obj).then(() => {
            func && func();
        });
    }
}


export default Database