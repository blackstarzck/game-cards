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

    async getSingleData(tableName, docName, func){
        const docRef = doc(this.db, tableName, docName);
        const document = await getDoc(docRef);
        const result = document.data();
        console.log(`[get] tableName: ${tableName}, docName: ${docName}`, result);
        func && func(result);
        return result;
    }

    writeNewData(tableName, docum, input, func){
        const docName = String(docum);

        console.log(`[write] tableName: ${tableName}, docName: ${docName} input: `, input);

        this.getSingleData(tableName, docName)
        .then((result) => {
            let doubleCheck = false;

            switch(tableName){
                case "ALARM_TABLE" :
                    console.log(20000000000, result);
                    if(result && result.data.length > 0){
                        for(let i = 0; i < result.data.length; i++){
                            if(result.data[i].TRG_ID == input.frdId && result.data[i].TRG_NAME == input.frdName){
                                doubleCheck = true;
                                break;
                            }
                        }
                    }
                    if(!doubleCheck){
                        const inputData = result ? 
                            [ ...result.data, { ALARM_TYPE : "FRD_REQ_SENT",READ_STATE : "N",RESULT : "N",TIME_STAMP : new Date(),TRG_ID : input.frdEmail,TRG_NAME : input.frdName,TRG_UID : "" }] :
                            [ { ALARM_TYPE : "FRD_REQ_SENT",READ_STATE : "N",RESULT : "N",TIME_STAMP : new Date(),TRG_ID : input.frdEmail,TRG_NAME : input.frdName,TRG_UID : "" }];
                        setDoc(doc(this.db, "ALARM_TABLE", docName), {
                            UID: "",
                            USER_ID: input.frdEmail,
                            USER_NAME: input.frdName,
                            data: inputData
                        });
                        console.log("친구신청 완료");
                        return { state: "success", msg: "친구신청이 완료되었습니다." }
                    }else{
                        console.log("친구신청 중복");
                        return { state: "error", msg: "이미 친구신청하였습니다." }
                    }
                break;
                case "USER_LOG" :
                    const inputData = result ? 
                        [ ...result.LOG, { STATUS: input.inOut, TIME_STAMP: new Date() } ] :
                        [ { STATUS: input.inOut, TIME_STAMP: new Date() } ];
                    setDoc(doc(this.db, "USER_LOG", docName), {
                        UID: "",
                        USER_ID: input.id,
                        USER_NAME: input.name,
                        LOG: inputData
                    });
                break;
                case "USERS" :
                    let email = input.email
                    // if(input.id.indexOf("K") > -1) email = input.email;
                    if(input.id.indexOf("F") > -1) email = input.id.replace("F-", "");
                    setDoc(doc(this.db, "USERS", docName), {
                        ACCOUNT_STATE : "Y",
                        AUTO_LOGIN : "N",
                        ENTER_DATE : result?.ENTER_DATE || new Date(),
                        LEAVE_DATE : "",
                        REGI_TYPE : input.regi_type,
                        UID : "",
                        USER_EMAIL : email,
                        USER_ID : input.id,
                        USER_NAME : input.name,
                        USER_PW : input.pwd ? input.pwd : ""
                    }).then(() => {
                        func && func();
                    });
                break;
            }
        });
    }
}


export default Database